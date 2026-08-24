const { Router } = require('express');
const tasks = require('./tasks');

const router = Router();

// Middleware para validar el parámetro id
const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'Invalid id parameter'
    });
  }

  next();
};

// Middleware para validar el parámetro isCompleted
const validateStatus = (req, res, next) => {
  const { isCompleted } = req.params;

  if (isCompleted !== 'true' && isCompleted !== 'false') {
    return res.status(400).json({
      message: 'Invalid isCompleted parameter'
    });
  }

  next();
};

// Listar todas las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// Filtrar tareas completas o incompletas
router.get('/status/:isCompleted', validateStatus, (req, res) => {
  const isCompleted = req.params.isCompleted === 'true';

  const filteredTasks = tasks.filter(
    task => task.isCompleted === isCompleted
  );

  res.json(filteredTasks);
});

// Ver una tarea específica
router.get('/:id', validateId, (req, res) => {
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