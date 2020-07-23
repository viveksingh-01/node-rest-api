const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const { userId } = jwt.verify(token, process.env.SECRET);
    req.userData = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `You're not authorised.`
    });
  }
};
