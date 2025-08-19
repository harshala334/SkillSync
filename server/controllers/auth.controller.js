const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.loginOrSignup = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    // Login
  } else {
    // Signup
    user = new User({ email, password });
    await user.save();
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email: user.email } });
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body; // Accept name
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });
  // Save name
  user = new User({ name, email, password });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email: user.email } });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email: user.email } });
};