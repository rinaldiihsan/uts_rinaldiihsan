const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const port = process.env.SERVER_PORT;

const Router = require('../src/router/router');

app.get('/', (req, res) => {
  res.send('Selamat Datang di API Restaurant!');
});

app.use(Router);

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});

module.exports = app;
