# 🔐 Two-Factor Authentication System

A complete full-stack web application implementing secure user authentication with Time-based One-Time Password (TOTP) two-factor authentication. Features a modern React frontend and robust Node.js/Express backend with comprehensive security measures.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)

## � Overview

This full-stack application provides a complete authentication system with TOTP-based two-factor authentication. The React frontend offers a modern, responsive user interface while the Node.js/Express backend ensures secure API operations, session management, and comprehensive 2FA workflows. Designed with security best practices and production-ready features.

## �🌟 Key Features

### 🔒 Security & Authentication
- **Secure User Registration & Login**: bcrypt password hashing with proper salt rounds
- **Two-Factor Authentication**: Complete TOTP workflow with QR code generation and verification
- **Session Management**: Secure HTTP-only cookies with MongoDB session store
- **Password Security**: Minimum complexity requirements and secure hashing
- **Rate Limiting**: Brute force protection with configurable limits
- **Security Headers**: Comprehensive protection with Helmet.js
- **Input Validation**: Server-side request validation and sanitization
- **CORS Protection**: Configurable cross-origin resource sharing

### 💻 User Experience
- **Modern React UI**: Clean, responsive design with Tailwind CSS
- **QR Code Setup**: Easy 2FA setup with authenticator app integration
- **Real-time Validation**: Instant form validation and user feedback
- **Protected Routes**: Authentication-based route protection
- **Loading States**: Visual feedback for all async operations
- **Error Handling**: User-friendly error messages and recovery options
- **Mobile Responsive**: Seamless experience on all device sizes
- **Accessibility**: ARIA labels and keyboard navigation support

### 🏗️ Technical Excellence
- **Clean Architecture**: Modular, maintainable code structure
- **RESTful API**: Standardized API design with proper HTTP status codes
- **Environment Configuration**: Flexible development/production configs
- **Health Monitoring**: Built-in status endpoints for monitoring
- **Hot Reload**: Fast development with Vite and nodemon
- **Error Boundaries**: Comprehensive error handling throughout the app

## 🏗️ Architecture

```
twofactorauth/
├── backend/                    # Node.js/Express API Server (Port: 8000)
│   ├── src/
│   │   ├── config/            # Database connection & Passport.js setup
│   │   │   ├── database.js    # MongoDB connection configuration
│   │   │   └── passport.js    # Authentication strategy setup
│   │   ├── controllers/       # Business logic & API handlers
│   │   │   └── authController.js  # Auth & 2FA logic
│   │   ├── middleware/        # Request processing middleware
│   │   │   ├── auth.js        # Authentication middleware
│   │   │   └── validation.js  # Input validation rules
│   │   ├── models/           # Database models
│   │   │   └── User.js        # User schema with 2FA fields
│   │   ├── routes/           # API route definitions
│   │   │   └── authRoutes.js  # Authentication endpoints
│   │   ├── utils/            # Utility functions
│   │   │   ├── response.js    # Standardized API responses
│   │   │   └── twoFactor.js   # 2FA utility functions
│   │   └── app.js            # Express app setup & configuration
│   ├── package.json          # Backend dependencies & scripts
│   └── README.md             # Backend documentation
│
├── frontend/                   # React.js Client Application (Port: 3002)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Loginform.jsx     # Login/registration form
│   │   │   ├── ProtectedRoute.jsx # Route authentication guard
│   │   │   ├── TwoFAStep.jsx     # 2FA setup with QR code
│   │   │   └── TwoVerify.jsx     # TOTP verification form
│   │   ├── context/          # React Context for state management
│   │   │   └── sessioncontext.jsx # Authentication context
│   │   ├── pages/            # Page components
│   │   │   ├── ErrorPage.jsx     # 404 error page
│   │   │   ├── HomePage.jsx      # User dashboard
│   │   │   ├── LoginPage.jsx     # Login/registration page
│   │   │   ├── Setup2fa.jsx      # 2FA setup page
│   │   │   └── Verify2fa.jsx     # 2FA verification page
│   │   ├── service/          # API services & routing
│   │   │   ├── api.js            # Axios configuration
│   │   │   ├── authapi.js        # Authentication API calls
│   │   │   └── routes.jsx        # React Router setup
│   │   ├── App.jsx           # Main application component
│   │   ├── index.css         # Tailwind CSS styles
│   │   └── main.jsx          # Application entry point
│   ├── package.json          # Frontend dependencies & scripts
│   └── README.md             # Frontend documentation
│
└── README.md                  # This comprehensive guide
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** 6+ (local installation or MongoDB Atlas)
- **npm** 8+
- **Authenticator App** (Google Authenticator, Authy, Microsoft Authenticator, etc.)

### 1. Clone & Setup
```bash
git clone <repository-url>
cd twofactorauth
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac
```

Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/twofactor-auth
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/twofactor-auth

# Session Security
SESSION_SECRET=your-super-secret-session-key-change-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3002
```

Start the backend server:
```bash
npm start
```
✅ Backend running on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
✅ Frontend running on `http://localhost:3002`

### 4. Access the Application
Open your browser and navigate to **http://localhost:3002**

## � User Flow

### 🆕 New User Registration
1. **Visit Application** → Navigate to http://localhost:3002
2. **Create Account** → Register with username and password
3. **Auto-Redirect** → Automatically redirected to 2FA setup page
4. **Scan QR Code** → Use authenticator app to scan the QR code
5. **Verify Setup** → Enter 6-digit TOTP code to enable 2FA
6. **Access Dashboard** → Welcome to the secure user dashboard

### 🔄 Returning User Login
1. **Login** → Enter username and password credentials
2. **2FA Check** → If 2FA enabled, redirected to verification page
3. **Enter TOTP** → Input current 6-digit code from authenticator app
4. **Dashboard Access** → Access the secure user dashboard with account info

### 🛡️ Security Workflow
- **Session-based Authentication**: Secure HTTP-only cookies
- **Protected Routes**: Unauthenticated users redirected to login
- **Automatic Logout**: Sessions expire and clear on logout
- **Error Handling**: User-friendly messages for all error states

## �📚 Complete API Documentation

### Base URL: `http://localhost:8000/api`

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

#### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "johndoe",
    "twoFactorEnabled": false
  }
}
```

#### Check Authentication Status
```http
GET /auth/status
```

**Response:**
```json
{
  "success": true,
  "isAuthenticated": true,
  "user": {
    "id": "...",
    "username": "johndoe",
    "twoFactorEnabled": true
  }
}
```

#### User Logout
```http
POST /auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Two-Factor Authentication Endpoints

#### Setup 2FA (Generate QR Code)
```http
POST /auth/setup-2fa
```

**Response:**
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSU...",
  "secret": "JBSWY3DPEHPK3PXP",
  "backupCodes": ["123456", "789012", "345678"]
}
```

#### Verify 2FA Setup
```http
POST /auth/verify-setup-2fa
Content-Type: application/json

{
  "token": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "2FA enabled successfully"
}
```

#### Verify 2FA During Login
```http
POST /auth/verify-2fa
Content-Type: application/json

{
  "token": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "2FA verification successful"
}
```

#### Disable 2FA
```http
POST /auth/disable-2fa
Content-Type: application/json

{
  "token": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "2FA disabled successfully"
}
```

### Utility Endpoints

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-07-29T10:30:00.000Z",
  "environment": "development"
}
```

## �️ Technology Stack

### Backend Technologies
- **Runtime**: Node.js 18+ with ES6+ modules
- **Framework**: Express.js for robust web application framework
- **Database**: MongoDB 6+ with Mongoose ODM for data modeling
- **Authentication**: Passport.js with local strategy for user authentication
- **Sessions**: express-session with connect-mongo for session storage
- **Security**: helmet (security headers), cors (cross-origin), express-rate-limit
- **2FA**: speakeasy for TOTP generation and verification
- **Password**: bcryptjs for secure password hashing
- **Environment**: dotenv for configuration management
- **QR Codes**: qrcode library for 2FA setup QR generation

### Frontend Technologies  
- **Framework**: React 18 with modern hooks and functional components
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Routing**: React Router DOM v7 for client-side navigation
- **HTTP Client**: Axios with credential support and interceptors
- **State Management**: React Context API with custom hooks
- **Authentication**: Session-based with secure cookie handling
- **2FA Integration**: QR code display and TOTP code input components

### Development Tools
- **Backend Development**: nodemon for auto-restart during development
- **Frontend Development**: Vite's hot module replacement (HMR)
- **Code Quality**: ESLint for code linting and consistency
- **CSS Processing**: PostCSS with Autoprefixer for vendor prefixing
- **Package Management**: npm for dependency management

## 🛡️ Security Implementation

### Backend Security Measures
- **Password Hashing**: bcrypt with 12 salt rounds for secure password storage
- **Session Security**: Secure HTTP-only cookies with MongoDB session store
- **Rate Limiting**: 100 requests per 15 minutes globally, stricter limits for auth endpoints
- **CORS Protection**: Configurable allowed origins with credential support
- **Security Headers**: Content Security Policy, HSTS, and other headers via Helmet.js
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Sanitized error responses that don't leak sensitive information
- **Environment Isolation**: Separate configurations for development and production

### Frontend Security Features
- **Protected Routes**: Authentication-based route protection throughout the app
- **Session Management**: Secure session storage with automatic cleanup on logout
- **CSRF Protection**: Same-site cookie configuration prevents cross-site attacks
- **Input Sanitization**: Client-side validation before API calls
- **Error Boundaries**: Comprehensive error handling to prevent information leakage

### 2FA Security Standards
- **TOTP Compliance**: RFC 6238 compliant Time-based One-Time Password implementation
- **Secure Secret Generation**: 32-character base32 secrets with cryptographic randomness
- **Time Window Tolerance**: 2-step time window for token verification flexibility
- **QR Code Security**: Temporary QR codes with secure secret display options
- **Backup Options**: Manual secret entry alternative to QR code scanning

## 📱 Component & Feature Overview

### Backend Components
- **authController.js**: Complete authentication logic including registration, login, 2FA setup/verification
- **User.js Model**: MongoDB schema with username, password hash, 2FA secret, and status fields
- **auth.js Middleware**: Route protection middleware ensuring proper authentication
- **validation.js**: Input validation rules for all API endpoints
- **twoFactor.js Utils**: TOTP generation, QR code creation, and verification utilities
- **passport.js Config**: Local strategy configuration for username/password authentication

### Frontend Components
- **LoginForm**: Dual-mode component for both login and registration with real-time validation
- **TwoFAStep**: QR code display for authenticator setup with copy-to-clipboard secret option
- **TwoVerify**: 6-digit TOTP code verification with input validation and error handling
- **ProtectedRoute**: Higher-order component providing authentication-based route protection
- **HomePage**: User dashboard displaying account information and security status
- **SessionContext**: React Context managing authentication state across the application

### Key Features
- **Responsive Design**: Mobile-first approach working seamlessly on all device sizes
- **Real-time Validation**: Instant feedback on form inputs with comprehensive error messaging
- **Loading States**: Visual feedback indicators for all asynchronous operations
- **Error Handling**: User-friendly error messages with proper fallback states
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Session Persistence**: Automatic session restoration on page refresh

## 🔧 Development Scripts

### Backend Scripts
```bash
# Start development server with auto-reload
npm start

# Start in production mode
npm run prod

# Check for security vulnerabilities
npm audit
```

### Frontend Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run code linting
npm run lint
```

## 🚀 Production Deployment

### Backend Deployment
1. **Environment Setup**: Configure production environment variables
2. **Database**: Ensure MongoDB is accessible (use MongoDB Atlas for cloud deployment)
3. **SSL/TLS**: Configure HTTPS certificates for secure connections
4. **Process Management**: Use PM2 or similar for process management
5. **Monitoring**: Set up logging and health monitoring

Production environment variables:
```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
SESSION_SECRET=your-super-secure-random-session-secret-min-32-chars
FRONTEND_URL=https://yourdomain.com
```

### Frontend Deployment
1. **Build Production Bundle**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Static Hosting**: Deploy `dist` folder to platforms like:
   - Netlify
   - Vercel  
   - AWS S3 + CloudFront
   - DigitalOcean App Platform
3. **API Configuration**: Update API base URL for production environment
4. **HTTPS**: Ensure SSL/TLS certificates are properly configured

### Deployment Platforms
- **Backend**: Heroku, AWS EC2, DigitalOcean Droplets, Railway, Render
- **Frontend**: Netlify, Vercel, AWS S3, Surge.sh, GitHub Pages
- **Database**: MongoDB Atlas (recommended), AWS DocumentDB, DigitalOcean Managed MongoDB

## 🧪 Testing & Development

### Testing the API
Using curl for backend API testing:
```bash
# Health check
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123"}'

# Login (save cookies)
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"TestPass123"}' \
  -c cookies.txt

# Setup 2FA (requires login)
curl -X POST http://localhost:8000/api/auth/setup-2fa \
  -b cookies.txt
```

### Development Mode Features
- **Hot Reload**: Both frontend (Vite) and backend (nodemon) support hot reloading
- **Debug Endpoints**: Development-only endpoints for session debugging
- **Source Maps**: Enabled in development for easier debugging
- **Detailed Logging**: Comprehensive logging in development mode

## 🐛 Troubleshooting Guide

### Common Backend Issues

**MongoDB Connection Errors:**
- Verify MongoDB service is running: `systemctl status mongod` (Linux) or check MongoDB Compass
- Check connection string format in `.env` file
- For MongoDB Atlas: Verify network access and database user permissions
- Ensure firewall isn't blocking MongoDB port (27017)

**Session-Related Problems:**
- Verify `SESSION_SECRET` is properly set in environment variables
- Check MongoDB session store connection
- Clear browser cookies and restart both servers
- Ensure MongoDB has sufficient disk space for session storage

**CORS Errors:**
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL exactly
- Check that `withCredentials: true` is set in frontend API configuration
- Ensure both servers are running on correct ports (Backend: 8000, Frontend: 3002)

**Rate Limiting Issues:**
- Clear rate limit by restarting backend server
- Check IP address isn't hitting rate limits (100 requests per 15 minutes)
- Verify rate limiting configuration in `app.js`

### Common Frontend Issues

**API Connection Problems:**
- Ensure backend server is running on `http://localhost:8000`
- Check browser developer tools Network tab for failed requests
- Verify Vite proxy configuration is correct
- Test backend endpoints directly with curl or Postman

**2FA QR Code Not Loading:**
- Verify user is properly logged in (check authentication status)
- Check browser console for JavaScript errors
- Ensure backend 2FA endpoints are accessible
- Try refreshing the page or logging out and back in

**Session Persistence Issues:**
- Check browser cookies are enabled
- Verify session cookies are being set (check Application tab in DevTools)
- Ensure `withCredentials: true` is set in API requests
- Clear browser cookies and cache, then retry

**Build or Development Server Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for port conflicts (default frontend port is 3002)
- Verify all environment variables are properly configured
- Ensure Node.js version is 18+ compatible

### Security-Related Issues

**2FA Token Verification Failures:**
- Ensure device time is synchronized (TOTP is time-sensitive)
- Check authenticator app is generating codes correctly
- Verify 6-digit code format and no extra characters
- Try codes within 30-second time window

**Authentication Loops:**
- Clear all browser cookies and localStorage
- Restart both frontend and backend servers
- Check for conflicting session data
- Verify authentication middleware is working correctly

### Debug Tools

**Backend Debug Endpoints (Development Only):**
```bash
# Check session information
curl http://localhost:8000/debug/session -b cookies.txt

# Health check with detailed info
curl http://localhost:8000/health
```

**Frontend Debug Steps:**
1. Open browser Developer Tools
2. Check Console tab for JavaScript errors
3. Monitor Network tab for failed API requests
4. Inspect Application tab for cookies and session storage
5. Use React Developer Tools extension for component debugging

### Performance Issues

**Slow API Responses:**
- Check MongoDB query performance and indexes
- Monitor server CPU and memory usage
- Verify network connectivity between frontend and backend
- Check for rate limiting affecting requests

**Frontend Loading Issues:**
- Clear browser cache and hard refresh
- Check for large bundle sizes in production build
- Verify static assets are loading correctly
- Monitor network requests for slow responses


## 🤝 Contributing

We welcome contributions to improve the Two-Factor Authentication System! Please follow these guidelines:

### Getting Started
1. **Fork** the repository on GitHub
2. **Clone** your fork locally: `git clone https://github.com/yourusername/twofactorauth.git`
3. **Create a feature branch**: `git checkout -b feature/amazing-feature`
4. **Install dependencies** for both frontend and backend
5. **Make your changes** following the coding standards below

### Coding Standards
- **Backend**: Follow Node.js best practices with ES6+ modules
- **Frontend**: Use functional components with React hooks
- **Code Style**: Maintain consistent naming conventions and formatting
- **Comments**: Add clear comments for complex logic
- **Error Handling**: Include proper error handling and user feedback
- **Testing**: Add tests for new features and bug fixes

### Development Workflow
1. **Create meaningful commits**: Use clear, descriptive commit messages
2. **Test thoroughly**: Ensure all functionality works in both development and production modes
3. **Update documentation**: Update README files and comments as needed
4. **Check security**: Verify that changes don't introduce security vulnerabilities

### Submitting Changes
1. **Push to your fork**: `git push origin feature/amazing-feature`
2. **Open a Pull Request**: Provide detailed description of changes and their impact
3. **Address feedback**: Respond to code review comments promptly
4. **Squash commits**: Clean up commit history before merging

### Areas for Contribution
- 🔒 **Security enhancements**: Additional security measures and best practices
- 🎨 **UI/UX improvements**: Better user interface and experience
- 🧪 **Testing**: Unit tests, integration tests, and end-to-end testing
- 📚 **Documentation**: Improved guides, tutorials, and API documentation
- 🚀 **Performance**: Optimization and performance improvements
- 🔧 **Features**: New functionality like email verification, password reset, etc.

### Code of Conduct
- Be respectful and constructive in all interactions
- Follow security best practices when contributing
- Ensure contributions are original or properly attributed
- Test changes thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required
- ❗ No warranty provided

## 🙏 Acknowledgments

- **Security Libraries**: Thanks to the maintainers of bcryptjs, helmet, and speakeasy
- **Frontend Tools**: Appreciation for the React, Vite, and Tailwind CSS teams
- **Database**: MongoDB for reliable data storage and session management
- **Authentication**: Passport.js for robust authentication middleware
- **Community**: All contributors and users who help improve this project

---

**🔐 Built with security in mind using modern web technologies and industry best practices.**

*For detailed documentation on individual components, see the README files in the `backend/` and `frontend/` directories.*
