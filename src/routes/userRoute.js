const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//used for password hashing and un-hashing
var bcrypt = require('bcryptjs');

//File contains functions for DB interactions
const model = require('../db/model.js');

//DB Connection object
const dbConn = require('../db/config').conn;

const appData = require('../appData').appData;

//File contains string(like routes)
const ROUTE_DATA = require('../appData').routeData;

//File contains SQL queries
const SQL = require('../db/sqlQueries');

const checkAuth = require('../middleware/check-auth');
									
// @Route : /user/fetch
// @function : fetch all users
// @access : Public
// @input : N.A.
// @output : JSON object containing status code and user data (if executed successfully) 
router.get(ROUTE_DATA.FETCH_USERS, checkAuth, (req,res) => {
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
			 		res.send({status: 400, message: 'Invalid email password combination'});	
			 	}
			 	else {

					bcrypt.compare(req.body.password, data[0].password)
						  .then( (result) => {
							  console.log("result", result);
							  if(result)  {
								  const token = jwt.sign({
									  email : data[0].email,
								 },  appData.JWT_SECRET,
								 {
									 expiresIn : "1h"
								 });
								 res.send( {status:200, token});
							  }
							  else 
							 	 return res.send({status: 400, message: 'Invalid email password combination'});
						  }).catch( (err) => {
							  console.log("err", err)
								res.send({status: 500, message: 'Something went wrong'});
						  })
			 	}
		 });		
});


// @Route : /user/signUp
// @function : Signup user
// @access : Public
// @input : First name, last name, email & password
// @output : JSON object containing status code and user data (if executed successfully) 
router.post(ROUTE_DATA.SIGNUP, (req,res) => {
	console.log("In / singup");
	let {firstName, lastName, email, password} = req.body;
	model.fetchUserEmail(dbConn, SQL.FIND_USER_MAIL, email)
		 .then( (data) => {
			 if(data.length) {
				 console.log("data>>>", data);
				 res.send({status:400, message: "Email already exists" });
			 }
			 else {
				 bcrypt.hash(password, 10)
				 	   .then( (hash) => {
							  req.body.password = hash;
							  model.signup(dbConn, SQL.CREATE_NEW_USER, req.body)
							  	   .then( (result) => {
										 console.log("result>>>", result.affectedRows)
										 if(result.affectedRows > 0) {
											const token = jwt.sign({
																email : email,
															},  appData.JWT_SECRET,
															{
																expiresIn : "1h"
															});
											res.send( {status:200, token});
										 } else {
											 res.send({status:500, message : "something went wrong"});
										 }
									 }).catch( (err) => {
										 console.log("error", err);
										res.send({status:500, message : "something went wrong"});
									 })
						})
			 }
		 })
	
});


// @Route : /user/Update
// @function : Update user data
// @access : protected
// @input : email, newEmail, newPassword, newFName, newLName
// @output : JSON object containing status code and success/error message

router.post(ROUTE_DATA.UPDATE, checkAuth, (req,res) => {
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