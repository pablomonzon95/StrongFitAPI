const getPool = require("../../database/getPool");

const deleteDietById = async (id) => {
  const pool = getPool();
  await pool.query("DELETE FROM diets WHERE id = ?", [id]);
};
module.exports = deleteDietById;