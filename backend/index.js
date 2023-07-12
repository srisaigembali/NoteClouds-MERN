const connectDB = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'), (err) => {
    res.status(500).send(err);
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running successfully on port: ${port}`);
});
