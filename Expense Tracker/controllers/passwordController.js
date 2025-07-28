const { User, ForgotPassword } = require('../db');
const brevo = require('../utils/brevoClient');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const request = await ForgotPassword.create({
      id: uuidv4(),
      userId: user.id,
    });

    const resetLink = `${process.env.RESET_PASSWORD_BASE_URL}/${request.id}`;

    await brevo.sendTransacEmail({
      sender: { email: 'sagarbj001@gmail.com' }, 
      to: [{ email: user.email }],
      subject: 'Reset your password',
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.resetPasswordForm = async (req, res) => {
  const { uuid } = req.params;
  const request = await ForgotPassword.findOne({ where: { id: uuid, isActive: true } });
  if (!request) return res.send('Invalid or expired link');

  res.sendFile('resetpassword.html', { root: './views' });
};


exports.updatePassword = async (req, res) => {
  const { uuid } = req.params;

  console.log('BODY:', req.body); 

  const password = req.body.password;
  if (!password) {
    return res.status(400).json({ message: 'Password is missing!' });
  }

  const request = await ForgotPassword.findOne({
    where: { id: uuid, isActive: true },
  });

  if (!request) return res.send('Invalid or expired link');

  const hashed = await bcrypt.hash(password, 10);
  await User.update({ password: hashed }, { where: { id: request.userId } });

  request.isActive = false;
  await request.save();

  res.json({ message: 'Password updated successfully' });
};
