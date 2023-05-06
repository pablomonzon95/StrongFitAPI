import { diet } from "../../interface/diets";

const getPool = require("../../database/getPool");

const insertDiet = async (insertedDiet:diet):Promise<number> => {
  const { type, name, recipe, media, userId } = insertedDiet;

  const pool = getPool();

 
    const [{ insertId }] = await pool.query(
      "INSERT INTO diets (type,name,recipe,media,userId) VALUES(?,?,?,?,?)",
      [type, name, recipe, media, userId]
    );
    return insertId;
 
};
module.exports = insertDiet;
