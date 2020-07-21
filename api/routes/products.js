const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../models/product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

router.get('/', (req, res) => {
  Product.find()
    .select({ name: 1, price: 1, productImage: 1 })
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
    .select({ name: 1, price: 1, productImage: 1 })
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

router.post('/', upload.single('productImage'), (req, res) => {
  console.log(req.file);
  const { name, price } = req.body;
  const productImage = req.file.path;
  const product = new Product({ _id: new mongoose.Types.ObjectId(), name, price, productImage });
  product
    .save()
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
