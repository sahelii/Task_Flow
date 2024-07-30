const express = require('express');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Task routes
router.get('/tasks', authMiddleware, taskController.getTasks);
router.post('/tasks', authMiddleware, taskController.createTask);
router.put('/tasks/:id', authMiddleware, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
