const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Connection to DB
mongoose
  .connect(
    `mongodb+srv://node-rest:${process.env.MONGO_ATLAS_PWD}@cluster0.isme1.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to DB successfully.'))
  .catch((err) => console.log(err));

// Middleware used for logging
app.use(morgan('dev'));

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

// Handle errors related to invalid routes
app.use((req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

// Handle any error which occurs in the application
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
