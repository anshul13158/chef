router.post(ROUTE_DATA.SIGNIN, (req, res) => {
	console.log("In /signin");
	 
	 
	let {email, password} = req.body;
	model.fetchUserEmail( dbConn, SQL.FIND_USER_MAIL, email)
		 .then( (data) => {
			 	if(data === null || data.length===0 ) {
			 		res.send({status: 400, message: 'email not found'});	
			 	}
			 	else {
					  	bcrypt.hash(password, passHash)		//encrypt input password with help of salt 
					  		    .then( (hash) => {
					  		    	console.log("hashed>>>", hash+"\n\n\n");
					  		    	const fetchPass = data[0].password;
											bcrypt.compare(fetchPass, hash)
														.then( (result) => {
															console.log("pass>>>", fetchPass);
															console.log("\n\n\n"+hash + '\n' + fetchPass + '\n' + result)
															if(result=='true') {
																res.send({status: 200, data: data[0] });
															}
															else {
																res.send({status: 400, message: 'Invalid email password combination'})	
															}
														}).catch ( (err) => {
															if(err) console.log(err);
															res.send({status: 400, message: 'Something went wrong'});				
														})
						  		  }).catch( (err) => {
						  		  	console.log("error", err);
										   	res.send({status: 400, message: 'Something went wrong'});
						  		  });
			 	}
		 });		
});