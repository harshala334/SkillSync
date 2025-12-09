const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const auth = require('../middleware/auth');

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post('/', auth, projectController.createProject);

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public (or Private depending on requirements, usually Explore is Public)
router.get('/', projectController.getAllProjects);

// @route   POST /api/projects/:id/join
// @desc    Join a project
// @access  Private
router.post('/:id/join', auth, projectController.joinProject);

// @route   GET /api/projects/:id/teammates
// @desc    Get teammates for a project
// @access  Public
router.get('/:id/teammates', projectController.getProjectTeammates);

module.exports = router;
