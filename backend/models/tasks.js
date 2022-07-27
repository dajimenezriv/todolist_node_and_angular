const { Pool } = require('pg');
const StatsD = require('hot-shots');
const config = require('../utils/config');
const logger = require('../utils/logger');

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

const client = new StatsD({
  port: 8125,
  errorHandler: (err) => logger.error(err),
});

const getTasks = () => new Promise((resolve, reject) => {
  client.increment('getTasks()');
  pool.query(
    'SELECT * FROM tasks',
    (error, result) => {
      if (error) reject(error);
      else resolve(result.rows);
    },
  );
});

const getTask = (id) => new Promise((resolve, reject) => {
  client.increment('getTask()');
  pool.query(
    'SELECT * FROM tasks WHERE id = $1 LIMIT 1',
    [id],
    (error, result) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    },
  );
});

const newTask = (task) => new Promise((resolve, reject) => {
  try {
    const {
      title, description, done, datetime,
    } = task;

    pool.query(
      `INSERT INTO tasks 
      (title, description, done, datetime)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, done, datetime],
      (error, result) => {
        if (error) reject(error);
        else resolve(result.rows[0]);
      },
    );
  } catch (err) {
    reject(err);
  }
});

const updateTask = (task) => new Promise((resolve, reject) => {
  try {
    const {
      id, title, description, done, datetime,
    } = task;

    pool.query(
      `UPDATE tasks
      SET title=$1, description=$2, done=$3, datetime=$4
      WHERE id=$5
      RETURNING *`,
      [title, description, done, datetime, id],
      (error, result) => {
        if (error) reject(error);
        else resolve(result.rows[0]);
      },
    );
  } catch (err) {
    reject(err);
  }
});

const deleteTasks = () => new Promise((resolve, reject) => {
  pool.query(
    'DELETE FROM tasks',
    (error, result) => {
      if (error) reject(error);
      else resolve(result.rows);
    },
  );
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  pool.query(
    'DELETE FROM tasks WHERE id = $1',
    [id],
    (error, result) => {
      if (error) reject(error);
      else resolve(result.rows);
    },
  );
});

module.exports = {
  getTasks,
  getTask,
  newTask,
  updateTask,
  deleteTasks,
  deleteTask,
};
