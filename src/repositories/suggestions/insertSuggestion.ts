const getPool = require("../../database/getPool");

const insertSuggestion = async (insertedSuggestion) => {
  const { title, body, userId } = insertedSuggestion;

  const pool = getPool();

 
    const [{ insertId }] = await pool.query(
      "INSERT INTO suggestions (title, body,userId) VALUES(?,?,?)",
      [title, body, userId]
    );
    return insertId;
 
};
module.exports = insertSuggestion;
