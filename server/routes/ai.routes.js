const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
// Optional: restrict to logged-in users
const protect = require('../middleware/auth');

router.post('/generate', protect, aiController.generateRoadmap);

module.exports = router;
