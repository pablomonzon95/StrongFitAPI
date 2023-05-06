import Pool from "mysql2/typings/mysql/lib/Pool";

const getPool:() => Pool = require("../../database/getPool");

const deleteExerciseById = async (id:number) => {
  const pool = getPool();
  await pool.query("DELETE FROM exercises WHERE id = ?", [id]);
};
module.exports = deleteExerciseById;
