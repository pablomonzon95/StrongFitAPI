import { Pool } from "mysql2";

const getPool: () => Pool = require("../../database/getPool");

const deleteDietById = async (id:number) => {
  const pool = getPool();
  await pool.query("DELETE FROM diets WHERE id = ?", [id]);
};
module.exports = deleteDietById;