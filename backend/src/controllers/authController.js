import User from '../models/User.js';
import { ApiResponse, asyncHandler } from '../utils/response.js';
import { generateTwoFactorSecret, generateQRCodeDataURL, verifyTwoFactorToken } from '../utils/twoFactor.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
        return res.status(409).json(
            ApiResponse.error('User already exists with this username')
        );
    }

    // Create new user (password will be hashed by pre-save middleware)
    const newUser = new User({
        username: username.toLowerCase(),
        password
    });

    await newUser.save();
    
    console.log(`✅ New user registered: ${newUser.username}`);
    
    res.status(201).json(
        ApiResponse.success(
            'User registered successfully', 
            {
                id: newUser._id,
                username: newUser.username,
                createdAt: newUser.createdAt
            }
        )
    );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
    // Update last login timestamp
    await req.user.updateLastLogin();
    
    console.log(`✅ User logged in: ${req.user.username}`);
    
    res.status(200).json(
        ApiResponse.success(
            'Login successful',
            {
                id: req.user._id,
                username: req.user.username,
                isMfaActive: req.user.isMfaActive,
                lastLogin: req.user.lastLogin
            }
        )
    );
});

/**
 * @desc    Get authentication status
 * @route   GET /api/auth/status
 * @access  Private
 */
export const getAuthStatus = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json(
            ApiResponse.error('User not authenticated')
        );
    }

    res.status(200).json(
        ApiResponse.success(
            'User is authenticated',
            {
                id: req.user._id,
                username: req.user.username,
                isMfaActive: req.user.isMfaActive,
                lastLogin: req.user.lastLogin
            }
        )
    );
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
    const username = req.user?.username;
    
    req.logout((err) => {
        if (err) {
            console.error('❌ Logout error:', err);
            return res.status(500).json(
                ApiResponse.error('Logout failed')
            );
        }
        
        console.log(`✅ User logged out: ${username}`);
        res.status(200).json(
            ApiResponse.success('Logout successful')
        );
    });
});

/**
 * @desc    Setup two-factor authentication
 * @route   POST /api/auth/2fa/setup
 * @access  Private
 */
export const setupTwoFactorAuth = asyncHandler(async (req, res) => {
    const user = req.user;

    // Check if 2FA is already enabled
    if (user.isMfaActive) {
        return res.status(400).json(
            ApiResponse.error('Two-factor authentication is already enabled')
        );
    }

    // Generate secret and QR code
    const { secret, otpauthUrl } = generateTwoFactorSecret(user.username);
    const qrCodeDataURL = await generateQRCodeDataURL(otpauthUrl);

    // Update user with new secret (but don't activate yet)
    user.twoFactorSecret = secret;
    await user.save();

    console.log(`🔐 2FA setup initiated for user: ${user.username}`);

    res.status(200).json(
        ApiResponse.success(
            'Two-factor authentication setup initiated. Please verify with your authenticator app.',
            {
                qrCode: qrCodeDataURL,
                secret: secret // Include secret for manual entry
            }
        )
    );
});

/**
 * @desc    Verify and activate two-factor authentication
 * @route   POST /api/auth/2fa/verify
 * @access  Private
 */
export const verifyTwoFactorAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const user = req.user;

    // Check if user has a secret
    if (!user.twoFactorSecret) {
        return res.status(400).json(
            ApiResponse.error('Two-factor authentication setup required first')
        );
    }

    // Verify the token
    const isValid = verifyTwoFactorToken(token, user.twoFactorSecret);
    
    if (!isValid) {
        return res.status(400).json(
            ApiResponse.error('Invalid two-factor authentication token')
        );
    }

    // Activate 2FA
    user.isMfaActive = true;
    await user.save();

    console.log(`✅ 2FA activated for user: ${user.username}`);

    res.status(200).json(
        ApiResponse.success(
            'Two-factor authentication activated successfully',
            {
                isMfaActive: user.isMfaActive
            }
        )
    );
});

/**
 * @desc    Reset/disable two-factor authentication
 * @route   POST /api/auth/2fa/reset
 * @access  Private
 */
export const resetTwoFactorAuth = asyncHandler(async (req, res) => {
    const user = req.user;

    // Check if 2FA is enabled
    if (!user.isMfaActive) {
        return res.status(400).json(
            ApiResponse.error('Two-factor authentication is not enabled')
        );
    }

    // Reset 2FA settings
    user.isMfaActive = false;
    user.twoFactorSecret = null;
    await user.save();

    console.log(`🔓 2FA reset for user: ${user.username}`);

    res.status(200).json(
        ApiResponse.success(
            'Two-factor authentication has been disabled',
            {
                isMfaActive: user.isMfaActive
            }
        )
    );
});
