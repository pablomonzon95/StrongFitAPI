const getPool = require("../../database/getPool");

const selectDiets = async () => {
  const pool = getPool();
  const [diets] = await pool.query("SELECT * FROM diets ");
  return diets;
};
module.exports = selectDiets;
