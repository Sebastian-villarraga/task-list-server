const { Router } = require('express');
const tasks = require('./tasks');

const router = Router();

// Listar todas las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// Filtrar tareas completas o incompletas
router.get('/status/:isCompleted', (req, res) => {
  const isCompleted = req.params.isCompleted === 'true';

  const filteredTasks = tasks.filter(
    task => task.isCompleted === isCompleted
  );

  res.json(filteredTasks);
});

// Ver una tarea específica
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json(task);
});

module.exports = router;