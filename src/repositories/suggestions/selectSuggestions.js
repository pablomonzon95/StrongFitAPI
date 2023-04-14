const getPool = require("../../database/getPool");

const selectSuggestions = async () => {
  const pool = getPool();
  const [suggestions] = await pool.query("SELECT * FROM suggestions s JOIN users u ON s.userId = u.id ");
  return suggestions;

};
module.exports = selectSuggestions;
