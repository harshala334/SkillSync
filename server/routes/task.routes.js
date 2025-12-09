const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const protect = require('../middleware/auth');

// Protected routes - optionally can be public for viewing if desired, but good to protect
router.get('/:projectId', protect, taskController.getTasksByProject);
router.post('/', protect, taskController.createTask);
router.put('/reorder', protect, taskController.reorderTasks);
router.put('/:id', protect, taskController.updateTaskStatus); // Simple status update if needed
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
