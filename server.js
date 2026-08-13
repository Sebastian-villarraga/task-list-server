const express = require('express');

const app = express();

const PORT = 3000;

const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());

app.use('/tasks', viewRouter);
app.use('/tasks', editRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});