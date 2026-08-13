const express = require('express');

const app = express();

const PORT = 3000;

const tasks = [
  {
    id: 123456,
    isCompleted: false,
    description: 'Walk the dog'
  },
  {
    id: 123457,
    isCompleted: true,
    description: 'Buy groceries'
  },
  {
    id: 123458,
    isCompleted: false,
    description: 'Study Express'
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});