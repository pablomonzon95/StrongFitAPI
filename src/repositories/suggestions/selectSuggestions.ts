import { Pool, RowDataPacket } from "mysql2/promise";
import { suggestion } from "../../interface/suggestions";
const getPool: () => Pool = require("../../database/getPool");

const selectSuggestions = async ():Promise<suggestion[]> => {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM suggestions s JOIN users u ON s.userId = u.id ");
  return rows as suggestion[];

};
module.exports = selectSuggestions;
