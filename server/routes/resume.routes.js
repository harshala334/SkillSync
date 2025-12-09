const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume.controller');
const protect = require('../middleware/auth');

router.post('/save', protect, resumeController.saveResume);
router.get('/', protect, resumeController.getResume);

module.exports = router;
