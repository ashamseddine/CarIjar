const jwt = require('jwt'); 

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.SESSION_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE_DURATION,
  });
}

module.exports = {
  generateToken
}