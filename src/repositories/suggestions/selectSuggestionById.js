const getPool = require("../../database/getPool");

const selectSuggestionById = async (id) => {
  const pool = getPool();

  const [[suggestion]] = await pool.query("SELECT *  FROM suggestions WHERE id = ?", [id]);

  return suggestion;
};
module.exports = selectSuggestionById;