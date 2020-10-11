const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = body => boardsRepo.create(body);

const deleteBoard = id => boardsRepo.deleteBoard(id);

const update = (id, body) => boardsRepo.update(id, body);

module.exports = { getAll, get, create, deleteBoard, update };
