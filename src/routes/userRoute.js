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
const appData = require('../appData').appData;


//File contains SQL queries
const SQL = require('../db/sqlQueries');

const checkAuth = require('../middleware/check-auth');
						

// @Route : /user/fetch
// @function : fetch all users
// @access : Public
// @input : N.A.
// @output : JSON object containing status code and user data (if executed successfully) 
router.get(ROUTE_DATA.FETCH_USERS, (req,res) => {
	const fetchUsers = SQL.FETCH_ALL;
	model.fetchUsers(dbConn, fetchUsers)
		 .then( (data) => {
		 	res.send({status:200, data});
		 })
		 .catch( (err) => {
		 	
		 	res.send({status:400, err});
		 });
});



// @Route : /user/signIn
// @function : Signin user
// @access : Public
// @input : Email and password
// @output : JSON object containing status code and user data (if executed successfully) 
router.post(ROUTE_DATA.SIGNIN, (req, res) => {	 
	let {email, password} = req.body;
	
	model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
		 .then( (data) => {
			 	if(data === null || data.length===0 ) {
			 		res.send({status: 400, message: 'Invalid email password combination'});	
			 	}
			 	else {

					bcrypt.compare(req.body.password, data[0].password)
						  .then( (result) => {
							  
							  if(result)  {
								  const token = jwt.sign({
									  email : data[0].email,
								 },  process.env.JWT_SECRET,
								 {
									 expiresIn : "1h"
								 });
								 res.send( {status:200, token});
							  }
							  else 
							 	 return res.send({status: 400, message: 'Invalid email password combination'});
						  }).catch( (err) => {
							  
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
	let {firstName, lastName, email, password} = req.body;
	model.fetchUserEmail(dbConn, SQL.FIND_USER_MAIL, email)
		 .then( (data) => {
			 if(data.length) {
				 
				 res.send({status:400, message: "Email already exists" });
			 }
			 else {
				 bcrypt.hash(password, 10)
				 	   .then( (hash) => {
							  req.body.password = hash;
							  model.signup(dbConn, SQL.CREATE_NEW_USER, req.body)
							  	   .then( (result) => {
										 
										 if(result.affectedRows > 0) {
											const token = jwt.sign({
																email : email,
															},  process.env.JWT_SECRET,
															{
																expiresIn : "1h"
															});
											res.send( {status:200, token});
										 } else {
											 res.send({status:500, message : "something went wrong"});
										 }
									 }).catch( (err) => {
										 
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
	
	let {newFName, newLName, email, newEmail, newPassword} = req.body;
	if( (email === '' || email === undefined || email===null) && ((newEmail === '' || newEmail === undefined || newEmail===null) ) )  {
		return res.send({status:400, message: "Email can't be empty"});
	}

	if (newPassword === '' || newPassword === undefined || newPassword===null) {
			return res.send({status:400, message: "password can't be empty"});
	}


	newFName = newFName ? newFName : ' ';
	newLName = newLName ? newLName : ' ';
	


	model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
			 .then( (data) => {
			 		if(data === null || data.length===0 ) {
			 			return res.send({status: 400, message: 'User not found'});	
			 		}
			 		else {
			 			model.fetchUserEmail (dbConn, SQL.FIND_USER_MAIL, newEmail)
			 				   .then( (newData) => {
			 				   		
			 				   		if(newData.length != 0) {
			 				   			return res.send({status:400, message:"New Email id already present in DB"});
			 				   		}
			 				   		else {
			 				   				
									 			req.body.userId = data[0].userId;
									 			bcrypt.hash(newPassword, 10)	//encrypt input password with help of salt 
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
											  		    				 	
											  		    				 	res.send({status: 400, message: 'Somethings went wrong'});		 		
											  		    				 })	
											  		    }).catch( (err) => {
												  		  	
																   	res.send({status: 400, message: 'Somethingss went wrong'});
												  		  });
									 				   		}
			 				   	}).catch( (err) => {
			 				   			
			 				   			return res.send({status: 400, message: 'Somethingsss went wrong'});
			 				   		})
			 			
			 		}
			 })
});

module.exports = router;