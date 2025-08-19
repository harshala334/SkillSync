const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Debug log for route registration

// Signup route
router.post('/signup', (req, res, next) => {
  authController.signup(req, res, next);
});

// Login route
router.post('/login', (req, res, next) => {
  authController.login(req, res, next);
});

module.exports = router;