require("dotenv").config();
const getPool = require("./getPool");

const initDb = async () => {
    try {
      const pool = getPool();
      await pool.query(`CREATE DATABASE IF NOT EXISTS strong_fit;`);
      await pool.query(`USE strong_fit;`);
  
      console.log("Database created");
  
      console.log("Deleting tables...");
  
   
      await pool.query("DROP TABLE IF EXISTS exercises;");
      await pool.query("DROP TABLE IF EXISTS diets;");
      await pool.query("DROP TABLE IF EXISTS suggestions;");
      await pool.query("DROP TABLE IF EXISTS users;");

      console.log("Creating users table...");

    await pool.query(`
        CREATE TABLE users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            role ENUM("admin","normal") DEFAULT "normal",
            registrationCode VARCHAR(100),
            avatar VARCHAR(200)
        );
    `);

    console.log("Creating exercises table...");

    await pool.query(`
        CREATE TABLE exercises  (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            type ENUM ("aerobic", "strenght", "aerobic/strength"),
            movility ENUM ("reduced", "begginer", "advanced"),
            name VARCHAR (100) NOT NULL,
            description VARCHAR(5000) NOT NULL,
            media VARCHAR (500),
            userId INT UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating suggestions table...");

    await pool.query(`
        CREATE TABLE suggestions(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR (100) NOT NULL,
            body VARCHAR (5000) NOT NULL,
            userId INT UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating diets table...");

    await pool.query(`
        CREATE TABLE diets(
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            type ENUM ("vegan", "vegetarian", "meat"),
            name VARCHAR (100) NOT NULL,
            recipe VARCHAR(10000) NOT NULL,
            media VARCHAR (500),
            userId INT UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        );
    `);
    
    
      console.log("¡All done!🌠");
    } catch (error) {
      console.error(error.message);
    } finally {
      process.exit();
    }
  };
  
  initDb();
  