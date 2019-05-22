const jwtSecret = require('./jwtConfig');
const model = require('../db/model.js');
const SQL = require('../db/sqlQueries');
const dbConn = require('../db/config').conn;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;

passport.use('signIn', 
			  new localStrategy({
			  	 usernameField : 'email',
  				 passwordField : 'password',
			  	session : false,
			  }, (email, password, done) => {
			  		try {
			  			console.log("in auth")
			  			model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
			  				 .then( (data) => {
			  				 	if(data === null || data.length===0 ) {
			  				 		return done(null, false, {message : 'email not found'});
			  				 	}
								
					  			bcrypt.hash(password, passHash)		//encrypt input password with help of salt 
							  		  .then( (hash) => {
							  		   	console.log("hashed>>>", hash+"\n\n\n");
							  		   	const fetchPass = data[0].password;
										bcrypt.compare(fetchPass, hash)
										   	  .then( (result) => {
										   	  	if(!result) {
										   	  		return done(null, false, {message : 'Invalid email password combination'});
										   	  	}
										   	  	return done(null, data, {message : 'logged in success'});
										   	  });
										}).catch( (err) => {
											return done(null, false, {message : 'Something went wrong'});									
										})   	   
			  				 })
			  		}
			  		catch( error) {
			  			return done(err);
			  		}
			  })		
)