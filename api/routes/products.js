const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Products were fetched successfully.',
        products
      });
    })
    .catch(error => {
      res.status(500).json({
        error: {
          message: 'Something went wrong.',
          error
        }
      });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Product.findById({ _id: id })
    .then(product => {
      if (product) {
        res.status(200).json({
          message: 'Product was fetched successfully.',
          product
        });
      } else {
        res.status(404).json({
          message: 'No record found.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: {
          message: 'Something went wrong.',
          error
        }
      });
    });
});

router.post('/', (req, res) => {
  const products = [];
  for (let item of req.body) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: item.name,
      price: item.price
    });
    products.push(product);
  }

  Product.insertMany(products)
    .then(product => {
      res.status(201).json({
        message: 'Product was added successfully.',
        product
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  Product.update(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price
      }
    }
  )
    .then(() => {
      res.status(200).json({
        message: 'Product was updated successfully.'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({
        message: 'Product was deleted successfully.'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    });
});

module.exports = router;
