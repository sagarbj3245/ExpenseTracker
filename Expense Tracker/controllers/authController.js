const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db'); 

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).send('Email already exists');

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid password');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, isPremium: user.isPremium });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
