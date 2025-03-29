var express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes')
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
dotenv.config();

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port);
    console.log(`Connected to MongoDB and listening on port ${port}`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/api', routes);