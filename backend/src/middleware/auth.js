/**
 * Authentication middleware
 */
export const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ 
            success: false,
            message: "Authentication required" 
        });
    }
    next();
};

/**
 * Check if user has MFA enabled
 */
export const requireMFA = (req, res, next) => {
    if (!req.user.isMfaActive) {
        return res.status(403).json({ 
            success: false,
            message: "Two-factor authentication is required" 
        });
    }
    next();
};

/**
 * Check if user is already authenticated (for login/register routes)
 */
export const requireGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(400).json({ 
            success: false,
            message: "Already authenticated" 
        });
    }
    next();
};
