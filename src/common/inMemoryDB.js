/* eslint-disable require-atomic-updates */
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

(() => {
  for (let i = 0; i <= 3; i++) {
    DB.Users.push(new User());
  }
  const board = new Board();
  DB.Boards.push(board);
  DB.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
})();

const getAllEntity = async TABLE_NAME => {
  return DB[TABLE_NAME].slice(0);
};

const getEntity = async (TABLE_NAME, id) => {
  const entity = await DB[TABLE_NAME].filter(el => el.id === id);
  if (!entity[0]) {
    throw new Error(`Entity with id: ${id} not found`);
  } else if (entity.length > 1) {
    throw new Error('DB is corrupted');
  }
  return entity[0];
};

const createEntity = async (TABLE_NAME, entity) => {
  DB[TABLE_NAME].push(entity);
  return entity;
};

const deleteEntity = async (TABLE_NAME, id) => {
  const entityIndex = await DB[TABLE_NAME].findIndex(el => el.id === id);

  DB[TABLE_NAME].splice(entityIndex, 1);

  // eslint-disable-next-line no-empty
  if (TABLE_NAME === 'Boards') {
    const newTasksArray = [];
    DB.Tasks.forEach(el => {
      if (el.boardId !== id) newTasksArray.push(el);
    });

    if (newTasksArray.length > 0) DB.Tasks = newTasksArray;
  }

  if (TABLE_NAME === 'Users') {
    DB.Tasks.forEach(el => {
      if (el.userId === id) el.userId = null;
    });
  }
  return getAllEntity(TABLE_NAME);
};

const updateEntity = async (TABLE_NAME, id, body) => {
  const oldEntity = await getEntity(TABLE_NAME, id);
  DB[TABLE_NAME][DB[TABLE_NAME].indexOf(oldEntity)] = { ...body };
  return getEntity(TABLE_NAME, id);
};

const getAllTasks = async (TABLE_NAME, id) => {
  const tasks = await DB[TABLE_NAME].filter(el => el.boardId === id);
  return tasks;
};

module.exports = {
  getAllEntity,
  getEntity,
  createEntity,
  deleteEntity,
  updateEntity,
  getAllTasks
};
