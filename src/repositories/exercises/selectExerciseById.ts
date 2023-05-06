import { exercise } from "../../interface/exercises";

const getPool = require("../../database/getPool");

const selectExerciseById = async (id:number):Promise<exercise> => {
  const pool = getPool();

  const [[exercise]] = await pool.query("SELECT *  FROM exercises WHERE id = ?", [id]);

  return exercise;
};
module.exports = selectExerciseById;
