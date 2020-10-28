require('dotenv').config();

// Dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const swagger = require('./swagger/config');

const basePath = (process.env.NODE_ENV !== 'test') ? process.env.NODE_BASEPATH : '';


const { handleError, ErrorHandler } = require('./helpers/error');
// Mongo config
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}+/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

// Express configuration
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({ });
  }
  return next();
});

// Models
require('./models/devlogModel');
require('./models/projectModel');
require('./models/accountModel');

// Routers

if (process.env.NODE_ENV === 'dev') swagger(app);
app.use(`${basePath}/projects`, require('./routes/projectRouter'));
app.use(`${basePath}/devlogs`, require('./routes/devlogRouter'));
app.use(`${basePath}/accounts`, require('./routes/accountRouter'));
app.use(`${basePath}/comments`, require('./routes/commentRouter'));
app.use(`${basePath}/image`, require('./routes/imageRouter'));


// Send a 404 when no other routes are found
app.use((req, res, next) => {
  throw new ErrorHandler(404, 'Resource not found');
});

// Handle the error
app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

app.listen(process.env.PORT);

module.exports = app;
