import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema Definition
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    password: { 
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    isMfaActive: {
        type: Boolean,
        default: false,
    },
    twoFactorSecret: {
        type: String,
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

/**
 * Pre-save middleware to hash password
 */
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Instance method to compare password
 */
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Instance method to update last login
 */
UserSchema.methods.updateLastLogin = function() {
    this.lastLogin = new Date();
    return this.save();
};

/**
 * Static method to find user by username
 */
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username: username.toLowerCase() });
};

/**
 * Transform output - remove sensitive fields
 */
UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.twoFactorSecret;
    return userObject;
};

const User = mongoose.model("User", UserSchema);
export default User;
