import mongoose from 'mongoose';

export const 
connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Vishnu:4yvT6QjBVusSvzg6@cluster0.rtazada.mongodb.net/');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
