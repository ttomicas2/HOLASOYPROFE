const mysql = require('mysql');
const {DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER} = require('./config.js');

let con;
    con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port : DB_PORT,
    database: DB_DATABASE
});


module.exports = {
    con : con
}