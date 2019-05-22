const express = require('express');
const router = express.Router();

//File contains functions for DB interactions
const model = require('../db/model.js');

//DB Connection object
const dbConn = require('../db/config').conn;
//console.log("conn>>>", dbConn);
router.get('/', (req,res) => {
	console.log("in /");
	//dbConn.connect( (err) => {
		// if(err) {
		//   throw err;
		// }
		console.log("DB connected");
		const fetchUsers = "SELECT * FROM users";
		model.fetchUsers(dbConn, fetchUsers)
			 .then( (rows) => {
			 	res.send({rows});
			 })
			 .catch((err)=>{
			 	console.log(err);
			 	res.send({err});
			 })
			 // .then( (results, fields) => {
			 // 	console.log(results);
				// res.send({results});
			 // })
			 // .catch( (err) => {
			 // 	throw(err);
			 // });
	//});

});

module.exports = router;