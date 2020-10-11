const DB = require('../../common/inMemoryDB');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => DB.getAllTasks(TABLE_NAME, boardId);

const get = async id => DB.getEntity(TABLE_NAME, id);

const create = async user => DB.createEntity(TABLE_NAME, user);

const deleteUser = async id => DB.deleteEntity(TABLE_NAME, id);

const update = async (id, body) => DB.updateEntity(TABLE_NAME, id, body);

module.exports = { getAll, get, create, deleteUser, update };
