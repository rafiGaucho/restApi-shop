const express = require('express');
const app=express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true })
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.use(morgan('dev'))
app.use(bodyParser.json())

//handling CORS errors
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method','PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)

app.use((req,res,next)=>{
  const error = new Error('not found');
  error.status=404;
  next(error)
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500)
  res.json({
    error:{
      message:error.message
    }
  })
})
module.exports = app;
