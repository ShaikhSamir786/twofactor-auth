import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

/**
 * Generate a new secret for two-factor authentication
 * @param {string} username - User's username
 * @param {string} issuer - Service name/issuer
 * @returns {Object} Secret object with base32 key and QR code URL
 */
export const generateTwoFactorSecret = (username, issuer = 'TwoFactorAuth App') => {
    const secret = speakeasy.generateSecret({
        name: username,
        issuer: issuer,
        length: 32
    });

    return {
        secret: secret.base32,
        otpauthUrl: secret.otpauth_url
    };
};

/**
 * Generate QR code data URL from OTP auth URL
 * @param {string} otpauthUrl - OTP auth URL
 * @returns {Promise<string>} QR code data URL
 */
export const generateQRCodeDataURL = async (otpauthUrl) => {
    try {
        return await qrcode.toDataURL(otpauthUrl);
    } catch (error) {
        throw new Error('Failed to generate QR code');
    }
};

/**
 * Verify two-factor authentication token
 * @param {string} token - User provided token
 * @param {string} secret - User's secret key
 * @param {number} window - Time window for verification (default: 2)
 * @returns {boolean} Verification result
 */
export const verifyTwoFactorToken = (token, secret, window = 2) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: window
    });
};
