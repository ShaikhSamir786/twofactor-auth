import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from '../models/User.js';

/**
 * Passport Local Strategy Configuration
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            // Find user by username
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: "Invalid username or password" });
            }

            // Verify password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Invalid username or password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

/**
 * Serialize user for session storage
 */
passport.serializeUser((user, done) => {
    console.log('🔐 Serializing user:', user.username);
    done(null, user._id);
});

/**
 * Deserialize user from session
 */
passport.deserializeUser(async (id, done) => {
    try {
        console.log('🔓 Deserializing user with ID:', id);
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
