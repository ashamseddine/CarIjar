const express = require('express');
const authRouter = express.Router({mergeParams: true});
const AuthController = require('../controllers/AuthController')

authRouter.post("/signin",  passport.authenticate('local'), (req, res) => {
  const token = jwt.sign({ id: req.user.id }, 'secret-key', { expiresIn: '1h' });
  res.json({ token });
});

authRouter.post("/logout", (req, res) => {
  req.logout(); 
  res.sendStatus(200); 
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;