import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js'; 
import user from './model/user.js'; // Assuming you have a user model defined
const app = express();


connectDB()

const userSchema = new mongoose.Schema({
    name: {type :String, required: true},
    age:Number
});

// Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

app.get('/get', (req, res) => {
    res.send('Hello, World!');
});
app.post('/post', (req, res) => {
    res.send('Post request received!');
});
app.put('/put', (req, res) => {
    res.send('Put request received!');
});
app.delete('/delete', (req, res) => {
    res.send('Delete request received!');   
});

app.listen(3000, () => {
    console.log('Server is running on 3000');
});