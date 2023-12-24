const express = require('express');
const router = express.Router();
const { Task } = require('../models/task').default;

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Add a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.title = title;
    task.description = description;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.destroy();
    res.json({ msg: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
