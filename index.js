const express = require('express');
const app = express();
const server = require('./src/server.js');

app.use(server);
