const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Middleware used for logging
app.use(morgan('dev'));

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
