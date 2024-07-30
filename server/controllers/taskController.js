const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

const createTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      userId: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, deadline } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, deadline },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
