const getPool = require("../../database/getPool");

const deleteExerciseById = async (id) => {
  const pool = getPool();
  await pool.query("DELETE FROM exercises WHERE id = ?", [id]);
};
module.exports = deleteExerciseById;
