import mongoose from 'mongoose';

export const 
connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogging');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
;