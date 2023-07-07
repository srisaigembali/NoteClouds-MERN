const connectDB = require('./db');
const express = require('express');

connectDB();

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middlewares
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server running successfully on port: ${port}`);
});
