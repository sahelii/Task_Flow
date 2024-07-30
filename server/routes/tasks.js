const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  try {
    const task = new Task({ title, description, status, priority, deadline, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, status, priority, deadline },
      { new: true }
    );
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).send('Task not found');
    res.send('Task deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
