const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/forgotpassword', passwordController.forgotPassword);
router.get('/resetpassword/:uuid', passwordController.resetPasswordForm);
router.post('/updatepassword/:uuid', passwordController.updatePassword);

module.exports = router;
