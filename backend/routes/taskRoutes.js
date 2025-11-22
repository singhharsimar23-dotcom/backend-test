// backend/routes/taskRoutes.js

const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /api/tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// POST /api/tasks - Add a new task
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTask = new Task({ title });
    const task = await newTask.save();
    res.status(201).json(task); // 201 Created
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

// PUT /api/tasks/:id - Update an existing task
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, runValidators: true } 
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});

module.exports = router;