const express = require('express');
const multer = require('multer');
const tokenValidation = require('../middlewares/token-validation');
const { getAllProducts, getProduct, saveProduct, updateProduct, deleteProduct } = require('../controllers/products');

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

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.post('/', tokenValidation, upload.single('productImage'), saveProduct);

router.patch('/:id', tokenValidation, updateProduct);

router.delete('/:id', tokenValidation, deleteProduct);

module.exports = router;
