const { Router } = require('express');
const tasks = require('./tasks');

const router = Router();

// Middleware para validar el cuerpo de una tarea
const validateTask = (req, res, next) => {
  const { id, isCompleted, description } = req.body;

  if (
    id === undefined ||
    typeof id !== 'number' ||
    isCompleted === undefined ||
    typeof isCompleted !== 'boolean' ||
    description === undefined ||
    typeof description !== 'string' ||
    description.trim() === ''
  ) {
    return res.status(400).json({
      message: 'Invalid task data'
    });
  }

  next();
};

// Middleware para validar POST
const validatePost = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request body cannot be empty'
    });
  }

  next();
};

// Middleware para validar PUT
const validatePut = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request body cannot be empty'
    });
  }

  next();
};

// Crear una tarea
router.post('/', validatePost, validateTask, (req, res) => {
  const task = req.body;

  tasks.push(task);

  res.status(201).json(task);
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.json(deletedTask[0]);
});

// Actualizar una tarea
router.put('/:id', validatePut, validateTask, (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    id
  };

  res.json(tasks[index]);
});

module.exports = router;