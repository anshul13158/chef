const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//used for password hashing and un-hashing
var bcrypt = require('bcryptjs');

//File contains functions for DB interactions
const model = require('../db/model.js');

//DB Connection object
const dbConn = require('../db/config').conn;

//File contains string(like routes)
const ROUTE_DATA = require('../appData').routeData;

//File contains SQL queries
const SQL = require('../db/sqlQueries');


const passHash = '$2a$10$fjjhjxhtHrBXcPsxsMMvOO';
									
// @Route : /user/fetch
// @function : fetch all users
// @access : Protected
// @input : N.A.
// @output : JSON object containing status code and user data (if executed successfully) 
router.get(ROUTE_DATA.FETCH_USERS, (req,res) => {
	console.log("in /");
	
	console.log("DB connected");
	const fetchUsers = SQL.FETCH_ALL;
	model.fetchUsers(dbConn, fetchUsers)
		 .then( (data) => {
		 	res.send({status:200, data});
		 })
		 .catch( (err) => {
		 	console.log(err);
		 	res.send({status:400, err});
		 });
});


// @Route : /user/signIn
// @function : Signin user
// @access : Public
// @input : Email and password
// @output : JSON object containing status code and user data (if executed successfully) 
router.post(ROUTE_DATA.SIGNIN, (req, res) => {
	console.log("In /signin");
	 
	 
	let {email, password} = req.body;
	console.log("email", email);
	model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
		 .then( (data) => {
			 	if(data === null || data.length===0 ) {
			 		res.send({status: 400, message: 'email not found'});	
			 	}
			 	else {
					  	bcrypt.hash(password, passHash)		//encrypt input password with help of salt 
					  		    .then( (hash) => {
					  		    	console.log(hash);
					  		    	const fetchPass = data[0].password;
					  		    	console.log(fetchPass);
					  		    	if(hash === fetchPass) {
					  		    		const token = jwt.sign({email, password}, passHash);
					  		    		const userId = data[0].userId;
					  		    		model.saveToken(dbConn, SQL.SAVE_TOKEN, {token, userId})
					  		    				 .then( (token) => {
					  		    						res.send({status: 200, token });		 	
					  		    				 }).catch( (err) => {
					  		    				 		res.send({status: 400, message: 'Something went wrong'});
					  		    				 })
					  		    		
					  		    	}
					  		    	else {
														res.send({status: 400, message: 'Invalid email password combination'});
											}
						  		  }).catch( (err) => {
						  		  	console.log("error", err);
										   	res.send({status: 400, message: 'Something went wrong'});
						  		  });
			 	}
		 });		
});


// @Route : /user/signUp
// @function : Signup user
// @access : Public
// @input : First name, last name, email & password
// @output : JSON object containing status code and user data (if executed successfully) 
router.post(ROUTE_DATA.SIGNUP, (req,res) => {
	res.send({});
});


// @Route : /user/Update
// @function : Update user data
// @access : protected
// @input : email, newEmail, newPassword, newFName, newLName
// @output : JSON object containing status code and success/error message

router.post(ROUTE_DATA.UPDATE, (req,res) => {
	console.log("In /update");
	const {newFName, newLName, email, newEmail, newPassword} = req.body;
	model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
			 .then( (data) => {
			 		if(data === null || data.length===0 ) {
			 			res.send({status: 400, message: 'User not found'});	
			 		}
			 		else {
			 			console.log("Data>>>",data);
			 			req.body.userId = data[0].userId;
			 			bcrypt.hash(newPassword, passHash)		//encrypt input password with help of salt 
					  		    .then( (hash) => {
					  		    		req.body.newPassword = hash;
					  		    		model.updateUser(dbConn, SQL.UPDATE_USER, req.body)
					  		    				 .then( (result) => {
						  		    				 	if(result) {
						  		    						res.send({status: 200, message: 'Updation successfull'});		 		
						  		    				 	}
						  		    				 	else {
						  		    				 		res.send({status: 400, message: 'Updation Failed'});		 			
						  		    				 	}
					  		    				 }).catch( (err) => {
					  		    				 	console.log("err", err);
					  		    				 	res.send({status: 400, message: 'Something went wrong'});		 		
					  		    				 })	
					  		    }).catch( (err) => {
						  		  	console.log("error", err);
										   	res.send({status: 400, message: 'Something went wrong'});
						  		  });
			 		}
			 })
});

module.exports = router;