const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentor.controller');
const protect = require('../middleware/auth');

router.get('/', mentorController.getAllMentors);
router.post('/register', protect, mentorController.registerAsMentor);
router.post('/connect', protect, mentorController.connectToMentor);

module.exports = router;
