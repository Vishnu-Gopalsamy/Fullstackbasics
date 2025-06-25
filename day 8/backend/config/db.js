import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI environment variable not set');
    }
    try {
        await mongoose.connect(uri);
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB connected');
        } else {
            console.log('MongoDB connection not established');
        }
    } catch (error) {
        console.log(error);
    }
};

