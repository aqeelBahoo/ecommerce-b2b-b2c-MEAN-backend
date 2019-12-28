var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose')


var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var productRouter = require('./routes/product');

var app = express();
app.use(cors())



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);


mongoose.connect('mongodb://localhost:27017/ecommerce-b2b-b2c', (err, database) => {
  if (err) {
    console.log('not connected to database');
  }
  console.log('successfully connected to database');

})

app.listen(3000, function () {
  console.log('server running ' + 3000)
})

