import { Router } from "express";
import passport from "passport";
import { 
    register, 
    login, 
    getAuthStatus, 
    logout, 
    setupTwoFactorAuth, 
    verifyTwoFactorAuth, 
    resetTwoFactorAuth 
} from '../controllers/authController.js';
import { requireAuth, requireGuest } from '../middleware/auth.js';
import { validateRegistration, validateLogin, validateTwoFactorToken } from '../middleware/validation.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', 
    requireGuest,
    validateRegistration,
    register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', 
    validateLogin,
    passport.authenticate('local', {
        failureMessage: true
    }),
    login
);

/**
 * @route   GET /api/auth/status
 * @desc    Get current authentication status
 * @access  Private
 */
router.get('/status', getAuthStatus);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', requireAuth, logout);

/**
 * @route   POST /api/auth/2fa/setup
 * @desc    Setup two-factor authentication
 * @access  Private
 */
router.post('/2fa/setup', requireAuth, setupTwoFactorAuth);

/**
 * @route   POST /api/auth/2fa/verify
 * @desc    Verify and activate two-factor authentication
 * @access  Private
 */
router.post('/2fa/verify', 
    requireAuth,
    validateTwoFactorToken,
    verifyTwoFactorAuth
);

/**
 * @route   POST /api/auth/2fa/reset
 * @desc    Reset/disable two-factor authentication
 * @access  Private
 */
router.post('/2fa/reset', requireAuth, resetTwoFactorAuth);

export default router;
