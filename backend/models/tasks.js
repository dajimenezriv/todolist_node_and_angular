const { Pool } = require('pg');
const config = require('../utils/config');

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: 5432,
});

const getTasks = () => new Promise((resolve, reject) => {
  pool.query(
    'SELECT * FROM tasks',
    (error, result) => {
      if (error) reject(error);
      else resolve(result.rows);
    },
  );
});

const getTask = (id) => new Promise((resolve, reject) => {
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
    const { title, description } = task;
    pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description],
      (error, result) => {
        if (error) reject(error);
        else resolve(result.rows[0]);
      },
    );
  } catch (err) {
    reject(err);
  }
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
  deleteTask,
};
