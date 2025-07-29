import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import MongoStore from 'connect-mongo';

// Import configurations
import { connectDatabase } from './config/database.js';
import './config/passport.js';

// Import routes
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Security Middleware
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

/**
 * Rate Limiting
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api', limiter);

/**
 * Stricter rate limiting for auth routes
 */
const authLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 10 requests per windowMs for auth routes
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.'
    },
});

app.use('/api/auth', authLimiter);

/**
 * CORS Configuration
 */
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

/**
 * Body Parsing Middleware
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * Session Configuration
 */
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600 // lazy session update
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    },
    name: 'sessionId' // Don't use default session name
}));

/**
 * Passport Middleware
 */
import passport from 'passport';
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use('/api/auth', authRoutes);

/**
 * Health Check Route
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

/**
 * Debug Route - Session Information (Development Only)
 */
if (process.env.NODE_ENV === 'development') {
    app.get('/debug/session', (req, res) => {
        res.status(200).json({
            success: true,
            data: {
                isAuthenticated: req.isAuthenticated(),
                user: req.user || null,
                sessionID: req.sessionID || null,
                session: req.session || null
            }
        });
    });
}

/**
 * 404 Handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/**
 * Global Error Handler
 */
app.use((error, req, res, next) => {
    console.error('❌ Error:', error);
    
    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error.message;
    
    res.status(error.status || 500).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

/**
 * Start Server
 */
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();
        
        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
