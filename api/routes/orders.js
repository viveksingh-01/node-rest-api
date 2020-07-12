const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched.'
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Order with id ${id} was fetched.`
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order was created.'
  });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Order with id ${id} was updated.`
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Order was deleted.'
  });
});

module.exports = router;