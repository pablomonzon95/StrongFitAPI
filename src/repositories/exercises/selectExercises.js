const getPool = require("../../database/getPool");

const selectExercises = async () => {
  const pool = getPool();
  const [exercises] = await pool.query("SELECT * FROM exercises ");
  return exercises;
};
module.exports = selectExercises;
