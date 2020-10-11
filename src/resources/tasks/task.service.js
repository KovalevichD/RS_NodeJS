const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const create = user => tasksRepo.create(user);

const deleteUser = id => tasksRepo.deleteUser(id);

const update = (id, body) => tasksRepo.update(id, body);

module.exports = { getAll, get, create, deleteUser, update };
