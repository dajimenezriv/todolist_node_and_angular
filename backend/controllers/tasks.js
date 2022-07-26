const router = require('express').Router();
const tasks = require('../models/tasks');

router.get('/', async (request, response) => {
  try {
    const res = await tasks.getTasks();
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.get('/:id', async (request, response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await tasks.getTask(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post('/', async (request, response) => {
  try {
    const res = await tasks.newTask(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await tasks.deleteTask(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;