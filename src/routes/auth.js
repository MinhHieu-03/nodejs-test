const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');



router.get('/register', authController.registerForm);
router.post('/register', authController.register);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);

router.get('/admin-register', authController.adminRegisterForm);
router.post('/admin-register', authController.adminRegister);

router.get('/admin-login', authController.adminloginForm);
router.post('/admin-login', authController.adminlogin);


router.get('/logout', authController.logout);

module.exports = router;
