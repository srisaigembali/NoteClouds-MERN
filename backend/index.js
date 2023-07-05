const connectDB = require('./db');
const express = require('express');

connectDB();

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running successfully on port: ${port}`);
});
