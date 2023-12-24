// app.js
const express = require('express');
const cors = require('cors');
const { Task } = require('./models');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const newTask = await Task.create({ title });
  res.json(newTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  await Task.destroy({ where: { id: taskId } });
  res.json({ id: parseInt(taskId) });
});
// app.js
// ... (your existing code)

app.put(
  '/api/tasks/:id',
  async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      const error = new Error('Task not found!');
      error.status = 404;
      return next(error);
    }
    next();
  },
  async (req, res) => {
    try {
      const taskId = req.params.id;
      const { title } = req.body; // Assuming you only want to update the title

      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found!' });
      }

      task.title = title;
      await task.save();
      
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found!' });
    }

    task.title = title;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (the rest of your existing code)



sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
