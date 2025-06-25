import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js'; 
import User from './model/user.js'; // Use capital 'U' for model

const app = express();

// Enable CORS without using the package
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET requests handler - for debugging
app.get('/', (req, res) => {
    res.send(`
        <h1>Backend API Server</h1>
        <p>Available endpoints:</p>
        <ul>
            <li>GET /get - Retrieve all users</li>
            <li>POST /post - Create a new user</li>
        </ul>
    `);
});

// Get all users
app.get('/get', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
    }
});

// Handle GET request to post endpoint (common mistake)
app.get('/post', (req, res) => {
    res.status(405).send(`
        <h1>Method Not Allowed</h1>
        <p>The /post endpoint only accepts POST requests, not GET requests.</p>
        <p>To submit data, please send a POST request with a JSON body.</p>
    `);
});

// Create a new user
app.post('/post', async (req, res) => {
    console.log('Received form data:', req.body);
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Email already exists' });
        } else {
            res.status(400).json({ success: false, message: error.message || 'Error creating user' });
        }
    }
});

app.put('/put', (req, res) => {
    res.send('Put request received!');
});
app.delete('/delete', (req, res) => {
    res.send('Delete request received!');   
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📝 API endpoints available:`);
    console.log(`   - GET  http://localhost:${PORT}/get    : Fetch all users`);
    console.log(`   - POST http://localhost:${PORT}/post   : Create new user`);
    console.log(`🔌 To verify: http://localhost:${PORT}/`);
    console.log(`===========================================`);
});

// Add error handler for server startup issues
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ ERROR: Port ${PORT} is already in use!`);
        console.error(`👉 Try changing the port or stopping the application using port ${PORT}`);
    } else {
        console.error(`❌ Server error:`, error);
    }
});