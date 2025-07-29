# 🔐 Two-Factor Authentication Frontend

A modern React application providing a complete two-factor authentication user interface. Features user registration, login, 2FA setup with QR codes, and secure session management.

## 🎯 Overview

This React frontend works with the Two-Factor Authentication backend to provide a seamless user experience for secure authentication. Users can register, login, set up TOTP-based 2FA using their mobile authenticator app, and manage their security settings.

## 🚀 Features

- ✅ **User Authentication**: Registration and login with validation
- ✅ **Two-Factor Setup**: QR code generation for authenticator apps
- ✅ **TOTP Verification**: 6-digit code verification workflow
- ✅ **Session Management**: Persistent login with secure logout
- ✅ **Protected Routes**: Authentication-based route protection
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: React 18 with modern hooks
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM v7 for navigation
- **HTTP Client**: Axios with credential support
- **State Management**: React Context API with custom hooks
- **Authentication**: Session-based with secure cookie handling
- **2FA Integration**: QR code display and TOTP code input

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** 8+
- **Backend API** running on `http://localhost:8000`
- **Authenticator App** (Google Authenticator, Authy, etc.)

## 🔧 Quick Start

### Installation
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Access the Application
- **Development URL**: http://localhost:3002
- **Backend Requirement**: Ensure backend is running on http://localhost:8000

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```
## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Loginform.jsx       # Login/registration form
│   │   ├── ProtectedRoute.jsx  # Authentication route guard
│   │   ├── TwoFAStep.jsx       # 2FA setup with QR code
│   │   └── TwoVerify.jsx       # TOTP verification form
│   ├── context/                # State management
│   │   └── sessioncontext.jsx # Authentication context
│   ├── pages/                  # Page components
│   │   ├── ErrorPage.jsx       # 404 error page
│   │   ├── HomePage.jsx        # User dashboard
│   │   ├── LoginPage.jsx       # Login/register page
│   │   ├── Setup2fa.jsx        # 2FA setup page
│   │   └── Verify2fa.jsx       # 2FA verification page
│   ├── service/                # API layer
│   │   ├── api.js              # Axios configuration
│   │   ├── authapi.js          # Authentication API calls
│   │   └── routes.jsx          # React Router setup
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Tailwind CSS styles
│   └── main.jsx                # Entry point
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

## � User Flow

### New User Registration
1. **Register** → Create account with username/password
2. **Auto Setup** → Redirected to 2FA setup page
3. **Scan QR** → Use authenticator app to scan QR code
4. **Verify** → Enter 6-digit TOTP code to enable 2FA
5. **Dashboard** → Access secure dashboard

### Returning User Login
1. **Login** → Enter username and password
2. **2FA Check** → If enabled, redirected to verification
3. **TOTP** → Enter current 6-digit code from app
4. **Dashboard** → Access user dashboard

## 🎨 Component Overview

**LoginForm** - Combined login/registration with validation
**TwoFAStep** - QR code display for authenticator setup
**TwoVerify** - 6-digit TOTP code verification
**ProtectedRoute** - Authentication-based route protection
**HomePage** - User dashboard with account information

## 📱 Key Features

- **Responsive Design**: Works on desktop and mobile
- **Form Validation**: Real-time input validation
- **Loading States**: Visual feedback for all operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Security**: Session-based authentication with CSRF protection

## � Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🛠️ Configuration

The app expects the backend to be running on `http://localhost:8000` with these endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/status` - Authentication status
- `POST /api/auth/logout` - User logout
- `POST /api/auth/setup-2fa` - Generate 2FA QR code
- `POST /api/auth/verify-setup-2fa` - Verify 2FA setup
- `POST /api/auth/verify-2fa` - Verify TOTP code

## 🔒 Security Considerations

- Session cookies are HTTP-only and secure
- All API requests include credentials
- Input validation on all forms
- Protected routes require authentication
- TOTP codes are validated server-side
- Secure logout clears all session data

## 🐛 Troubleshooting

**CORS Errors**: Ensure backend FRONTEND_URL matches http://localhost:3002
**API Errors**: Verify backend is running on port 8000
**Session Issues**: Check that cookies are enabled in browser
**2FA Problems**: Ensure device time is synchronized for TOTP

---

**Secure authentication made simple** 🔐

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }

VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=2FA Authentication App
```

### Deployment Checklist
- ✅ Backend API endpoints configured
- ✅ CORS settings for production domain
- ✅ HTTPS certificates installed
- ✅ Environment variables set
- ✅ Error tracking configured

## 🤝 Contributing

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code standards**: Use ESLint and Prettier
4. **Add tests**: Ensure new features are tested
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**: Describe changes and impact

### Code Standards
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add proper error handling
- Include loading states for async operations



**🔒 Security Notice**: This application implements industry-standard security practices including session-based authentication, CSRF protection, and TOTP-based two-factor authentication. Always ensure your backend API implements proper security measures for production use.

**📱 Mobile Ready**: The application is fully responsive and works seamlessly on desktop, tablet, and mobile devices.
