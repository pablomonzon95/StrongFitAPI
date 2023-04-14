const getPool = require("../../database/getPool");

const insertDiet = async (insertedNote) => {
  const { type, name, recipe, media, userId } = insertedNote;

  const pool = getPool();

 
    const [{ insertId }] = await pool.query(
      "INSERT INTO diets (type,name,recipe,media,userId) VALUES(?,?,?,?,?)",
      [type, name, recipe, media, userId]
    );
    return insertId;
 
};
module.exports = insertDiet;
