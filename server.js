const express = require('express');

const app = express();

const PORT = 3000;

const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());

// Middleware para validar métodos HTTP
app.use((req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validMethods.includes(req.method)) {
    return res.status(400).json({
      message: 'Invalid HTTP method'
    });
  }

  next();
});

app.use('/tasks', viewRouter);
app.use('/tasks', editRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});