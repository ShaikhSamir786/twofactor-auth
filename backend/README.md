# 🔐 Two-Factor Authentication Backend

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-green.svg)](https://www.mongodb.com/)

A secure Node.js/Express.js backend API with two-factor authentication using TOTP (Time-based One-Time Password). Features user registration, login, session management, and complete 2FA setup/verification workflow.

## 🎯 Overview

This backend provides a complete authentication system with 2FA capabilities, designed to work with a React frontend. It includes secure password handling, session management, TOTP generation, and comprehensive API endpoints for user authentication flows.

## 🚀 Features

- ✅ **User Registration & Login**: Secure user account creation and authentication
- ✅ **Password Security**: bcrypt hashing with proper salt rounds
- ✅ **Session Management**: Express sessions with MongoDB store and Passport.js
- ✅ **Two-Factor Authentication**: Complete TOTP workflow with QR code generation
- ✅ **API Security**: Rate limiting, CORS, helmet security headers
- ✅ **Input Validation**: Request validation and sanitization
- ✅ **Error Handling**: Consistent error responses and logging
- ✅ **Health Monitoring**: Health check endpoint for status monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES6+ modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with local strategy
- **Sessions**: express-session with connect-mongo
- **Security**: helmet, cors, express-rate-limit
- **2FA**: speakeasy for TOTP generation
- **Password**: bcryptjs for secure hashing
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js         # MongoDB connection configuration
│   │   └── passport.js         # Passport authentication strategy
│   ├── controllers/
│   │   └── authController.js   # Authentication business logic
│   ├── middleware/
│   │   ├── auth.js            # Authentication & authorization middleware
│   │   └── validation.js      # Input validation middleware
│   ├── models/
│   │   └── User.js            # User data model with Mongoose
│   ├── routes/
│   │   └── authRoutes.js      # API route definitions
│   ├── utils/
│   │   ├── response.js        # Standardized API response utilities
│   │   └── twoFactor.js       # 2FA utility functions
│   └── app.js                 # Main application entry point
├── .env                       # Environment variables (not in repo)
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## � Quick Start

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** 6+ (local or MongoDB Atlas)
- **npm** 8+

### Installation
```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac

# 4. Configure environment variables
# Edit .env file with your settings

# 5. Start the server
npm start
```

### Environment Variables
Create a `.env` file in the backend root:
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/twofactor-auth

# Session Security
SESSION_SECRET=your-super-secret-session-key-change-in-production

# Frontend
FRONTEND_URL=http://localhost:3002
```

## 🔌 API Endpoints

### Base URL: `http://localhost:8000/api`

### Authentication Routes

**POST** `/auth/register` - Register new user
```json
Request:
{
  "username": "johndoe",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "message": "User registered successfully"
}
```

**POST** `/auth/login` - User login
```json
Request:
{
  "username": "johndoe", 
  "password": "SecurePass123"
}

Response:
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

**POST** `/auth/logout` - User logout
```json
Response:
{
  "success": true,
  "message": "Logout successful"
}
```

**GET** `/auth/status` - Check authentication status
```json
Response:
{
  "success": true,
  "isAuthenticated": true,
  "user": { ... }
}
```

### Two-Factor Authentication Routes

**POST** `/auth/setup-2fa` - Generate 2FA setup QR code
```json
Response:
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "secret": "JBSWY3DP...",
  "backupCodes": ["123456", "789012", ...]
}
```

**POST** `/auth/verify-setup-2fa` - Verify 2FA setup
```json
Request:
{
  "token": "123456"
}

Response:
{
  "success": true,
  "message": "2FA enabled successfully"
}
```

**POST** `/auth/verify-2fa` - Verify 2FA during login
```json
Request:
{
  "token": "123456"
}

Response:
{
  "success": true,
  "message": "2FA verification successful"
}
```

**POST** `/auth/disable-2fa` - Disable 2FA
```json
Request:
{
  "token": "123456"
}

Response:
{
  "success": true,
  "message": "2FA disabled successfully"
}
```

### Utility Routes

**GET** `/health` - Health check
```json
Response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-07-29T...",
  "environment": "development"
}

```
## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Session Security**: Secure HTTP-only cookies
- **Rate Limiting**: Brute force protection
- **CORS**: Cross-origin request handling
- **Input Validation**: Request sanitization
- **Security Headers**: Helmet.js protection
- **Environment Isolation**: Development/production configs



## 🔧 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network connectivity and firewall settings

**Session Issues:**
- Check SESSION_SECRET in .env file
- Verify MongoDB session store is connected

**CORS Errors:**
- Ensure FRONTEND_URL matches your React app URL
- Check that credentials are included in frontend requests

**Port Conflicts:**
- Default port is 8000, change PORT in .env if needed
- Ensure no other services are using the same port

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Security Best Practices Implemented

- **Password Requirements**: Minimum length, complexity validation
- **Session Management**: Secure session configuration with MongoDB store
- **Authentication Middleware**: Route-level protection
- **Error Sanitization**: No sensitive data in error responses
- **Request Size Limiting**: Prevents DoS attacks via large payloads
- **Environment Separation**: Different configs for development/production

### Adding New Features

1. **Controllers**: Add business logic in `src/controllers/`
2. **Routes**: Define API endpoints in `src/routes/`
3. **Middleware**: Add reusable middleware in `src/middleware/`
4. **Models**: Define data models in `src/models/`
5. **Utilities**: Add helper functions in `src/utils/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📊 Performance & Monitoring

### Health Check Endpoint

The `/health` endpoint provides server status:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-07-28T10:30:00.000Z",
  "environment": "development"
}
```



## 🔮 Future Enhancements

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Account lockout after failed attempts
- [ ] Audit logging for security events
- [ ] API rate limiting per user
- [ ] Multi-device 2FA support
- [ ] Backup codes for 2FA
- [ ] OAuth integration (Google, GitHub)
- [ ] Advanced user roles and permissions
- [ ] API documentation with Swagger/OpenAPI
