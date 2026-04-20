const { User, ForgotPassword } = require('../db');
const brevo = require('../utils/brevoClient');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const path = require('path');


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const request = await ForgotPassword.create({
      id: uuidv4(),
      userId: user.id,
    });

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const resetPasswordBaseUrl = process.env.RESET_PASSWORD_BASE_URL?.trim();
    const baseUrl = resetPasswordBaseUrl || `${protocol}://${host}/password/resetpassword`;
    const resetLink = `${baseUrl}/${request.id}`;

    await brevo.sendTransacEmail({
      sender: { email: 'sagarbj001@gmail.com' }, 
      to: [{ email: user.email }],
      subject: 'Reset your password',
      htmlContent: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    const errorData = err.response?.body || err.response?.text || err.message;
    console.error('Password reset email failed:', {
      message: err.message,
      status: err.status || err.response?.status,
      data: errorData,
    });
    res.status(500).json({
      message: 'Could not send reset email',
      error: typeof errorData === 'string' ? errorData : JSON.stringify(errorData),
    });
  }
};


exports.resetPasswordForm = async (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'resetpassword.html'));
};


exports.updatePassword = async (req, res) => {
  const { uuid } = req.params;

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
