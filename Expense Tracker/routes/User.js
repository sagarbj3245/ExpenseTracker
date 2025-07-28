const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { User } = require('../db'); 

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['name', 'email'],
    });

    if (!user) return res.status(404).json({ message: 'Not found' });

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
