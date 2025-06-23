import express from 'express';
import connectDB from './config/db.js';

const app = express();
connectDB();
app.get('/', (req, res) => {
  res.send('from get request');
});
app.post('/', (req, res) => {
  res.send('from post request');
});
app.put('/', (req, res) => {
  res.send('from put request');
});
app.delete('/', (req, res) => {
  res.send('from delete request');
});

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });