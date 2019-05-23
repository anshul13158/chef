const mysql = require('mysql');
const appData = require('../appData');

//DB configs
const DB_NAME = process.env.DB_NAME;
const USER_NAME = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

module.exports.conn = mysql.createConnection({
	host : DB_HOST,
	user : USER_NAME,
	password : PASS,
	database : DB_NAME
});
