const mysql = require('mysql');
const appData = require('../appData');

//DB configs
const DB_NAME = appData.dbData.DB_NAME;
const USER_NAME = appData.dbData.USER_NAME;
const PASS = appData.dbData.PASS;
const DB_HOST = appData.dbData.DB_HOST;

module.exports.conn = mysql.createConnection({
	host : DB_HOST,
	user : USER_NAME,
	password : PASS,
	database : DB_NAME
});
