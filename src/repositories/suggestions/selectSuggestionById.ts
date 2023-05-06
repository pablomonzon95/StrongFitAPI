import { suggestion } from "../../interface/suggestions";

const getPool = require("../../database/getPool");

const selectSuggestionById = async (id:number):Promise<suggestion> => {
  const pool = getPool();

  const [[suggestion]] = await pool.query("SELECT *  FROM suggestions WHERE id = ?", [id]);

  return suggestion;
};
module.exports = selectSuggestionById;