// require modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// use modules
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

// database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas connection established');
});

// routes
const usersRouter = require('./routes/users');
const goodsRouter = require('./routes/goods');

app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

// server start
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
