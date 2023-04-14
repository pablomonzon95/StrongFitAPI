const getPool = require("../../database/getPool");

const insertExercise = async (insertedNote) => {
  const { type, movility, name, description, media, userId } = insertedNote;

  const pool = getPool();

 
    const [{ insertId }] = await pool.query(
      "INSERT INTO exercises (type,movility,name,description,media,userId) VALUES(?,?,?,?,?,?)",
      [type, movility, name, description, media, userId]
    );
    return insertId;
 
};
module.exports = insertExercise;
