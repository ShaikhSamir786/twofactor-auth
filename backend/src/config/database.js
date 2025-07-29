import mongoose from "mongoose";

/**
 * Database connection configuration
 */
export const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB connected successfully: ${connection.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🔌 MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
