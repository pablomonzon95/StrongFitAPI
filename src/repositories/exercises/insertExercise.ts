import { exercise } from "../../interface/exercises";

const getPool = require("../../database/getPool");

const insertExercise = async (insertedExercise: exercise): Promise<number> => {
  const { type, movility, name, description, media, userId } = insertedExercise;

  const pool = getPool();

 
    const [{ insertId }] = await pool.query(
      "INSERT INTO exercises (type,movility,name,description,media,userId) VALUES(?,?,?,?,?,?)",
      [type, movility, name, description, media, userId]
    );
    return insertId;
 
};
module.exports = insertExercise;
