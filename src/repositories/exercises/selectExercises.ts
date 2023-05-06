import { Pool, RowDataPacket } from "mysql2/promise";
import { exercise } from "../../interface/exercises";

const getPool: () => Pool = require("../../database/getPool");

const selectExercises = async (): Promise<exercise[]> => {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM exercises");
  return rows as exercise[];
};

module.exports = selectExercises;
