const router = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Order.find()
    .select({ product: 1, quantity: 1 })
    .populate('product', { name: 1, price: 1 })
    .then(orders => {
      res.status(200).json({
        message: 'Orders fetched successfully.',
        orders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong.',
        error
      });
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById({ _id: id })
    .select({ product: 1, quantity: 1 })
    .populate('product', { name: 1, price: 1 })
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'No record found'
        });
      }
      res.status(200).json({
        message: 'Order fetched successfully.',
        order
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    });
});

router.post('/', (req, res) => {
  const { product, quantity } = req.body;
  Product.findById({ _id: product })
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found.'
        });
      }
      const order = new Order({ _id: new mongoose.Types.ObjectId(), product, quantity });
      order
        .save()
        .then(order => {
          res.status(201).json({
            message: 'Order was placed successfully!',
            order
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Something went wrong.',
            error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong.',
        error
      });
    });
});

router.delete('/:id', (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Order was deleted successfully.'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong.',
        error
      });
    });
});

module.exports = router;
