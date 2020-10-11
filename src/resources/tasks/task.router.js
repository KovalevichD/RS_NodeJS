const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.json(Task.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const tasks = await tasksService.deleteUser(req.params.id);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.json(Task.toResponse(task));
});

module.exports = router;
