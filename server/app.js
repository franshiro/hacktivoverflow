var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose =  require('mongoose')
require('dotenv').config()

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
// mongoose.connect('mongodb://localhost/blog', {useNewUrlParser : true})
var mongodbUri ='mongodb://@ds151078.mlab.com:51078/hacktivoverflow';
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: process.env.MONGOUSER,
    password: process.env.MONGOPASS
  }
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
