import express from 'express';

const app = express();

app.get('/get', (req, res) => {
    res.send('Hello, World!');
})
app