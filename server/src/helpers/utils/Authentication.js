const jwt = require('jsonwebtoken'); 

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.SESSION_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE_DURATION,
  });
}

module.exports = {
  generateToken
}