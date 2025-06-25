import express from 'express';

const app = express();

// Basic middleware for parsing JSON
app.use(express.json());

// Basic CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test post route - handle both GET and POST requests
app.get('/test-post', (req, res) => {
  res.json({ 
    message: 'GET request received successfully! Note: This endpoint also accepts POST requests.'
  });
});

app.post('/test-post', (req, res) => {
  console.log('Received data:', req.body);
  res.json({ 
    message: 'Data received successfully!',
    data: req.body
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Try these endpoints:');
  console.log(`- GET  http://localhost:${PORT}/test`);
  console.log(`- POST http://localhost:${PORT}/test-post`);
});