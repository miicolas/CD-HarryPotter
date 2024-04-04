// dbConfig.js
import mysql from "mysql";

const pool = mysql.createPool({ // Création d'un pool de connexion à la base de données 
  host: "localhost",
  user: "root",
  password: "root",
  database: "cdi-hp",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", 
});

export default pool;