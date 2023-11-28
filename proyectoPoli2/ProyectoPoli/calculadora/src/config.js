const { config } = require("dotenv");

config();

 const PORT = process.env.PORT || 3000;
 const DB_USER = process.env.DB_USER || 'root';
 const DB_PASSWORD = process.env.DB_PASSWORD || '';
 const DB_HOST = process.env.DB_HOST || 'localhost';
 const DB_PORT = process.env.DB_PORT || 3306;
 const DB_DATABASE = process.env.DB_DATABASE || 'mydb2';

 module.exports = {
    PORT,
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
 }
