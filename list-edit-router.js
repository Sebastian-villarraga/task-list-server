const { Router } = require('express');
const tasks = require('./tasks');

const router = Router();

// Crear una tarea
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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