const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'Urgent'] },
  deadline: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
