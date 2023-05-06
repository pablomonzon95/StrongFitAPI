import { Pool, RowDataPacket } from "mysql2/promise";
import { diet } from "../../interface/diets";


const getPool: () => Pool = require("../../database/getPool");

const selectDiets = async () : Promise<diet[]> => {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM diets ");
  return rows as diet[];
};
module.exports = selectDiets;
