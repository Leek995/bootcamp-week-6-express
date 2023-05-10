const express = require('express');
const app = express();
const usersRouter = require('./routes/users.js')

// put middleware before all routes so all routes can use
app.use(express.json());
app.use('/users', usersRouter);
module.exports = app;