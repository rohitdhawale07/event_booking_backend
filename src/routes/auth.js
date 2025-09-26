const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');

const loginParams = {
  email: { isRequired: true, isTrim: true, isValidEmail: true },
  password: { isRequired: true, isTrim: true }
};

const registerParams = {
  mobile: { isRequired: true, isTrim: true, isValidPhone: true },
  email: { isRequired: true, isTrim: true, isValidEmail: true },
  password: { isRequired: true, isTrim: true }
};

router.post('/register', validateRequest(registerParams), authController.register);
router.post('/login', validateRequest(loginParams), authController.login);

module.exports = router;