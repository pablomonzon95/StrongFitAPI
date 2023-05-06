import { diet } from "../../interface/diets";

const getPool = require("../../database/getPool");

const selectDietById = async (id: number): Promise<diet> => {
  const pool = getPool();

  const [[diet]] = await pool.query("SELECT *  FROM diets WHERE id = ?", [id]);

  return diet;
};
module.exports = selectDietById;
