const DB = require('../../common/inMemoryDB');
const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntity(TABLE_NAME);

const get = async id => DB.getEntity(TABLE_NAME, id);

const create = async body => DB.createEntity(TABLE_NAME, body);

const deleteBoard = async id => DB.deleteEntity(TABLE_NAME, id);

const update = async (id, body) => DB.updateEntity(TABLE_NAME, id, body);

module.exports = { getAll, get, create, deleteBoard, update };
