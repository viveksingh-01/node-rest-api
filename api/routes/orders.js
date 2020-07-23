const router = require('express').Router();
const tokenValidation = require('../middlewares/token-validation');
const { getAllOrders, getOrder, saveOrder, deleteOrder } = require('../controllers/orders');

router.get('/', tokenValidation, getAllOrders);

router.get('/:id', tokenValidation, getOrder);

router.post('/', tokenValidation, saveOrder);

router.delete('/:id', tokenValidation, deleteOrder);

module.exports = router;
