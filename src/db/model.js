//Contains functions for DB interactions
const models = {
	fetchUsers : (dbConn, query) => {
		return new Promise( (resolve, reject) => {
			dbConn.query(query, (err, rows) => {
				if(err)
					reject(err);
				resolve(rows);	
			});
		})
	},
	fetchUserEmail : (dbConn, query, email) => {
		return new Promise( (resolve, reject) => {
			dbConn.query(query, [email], (err, results) => {
				if(err) {
					reject(err);
				}
				resolve(results);
			})
		});
	},
	updateUser : (dbConn, query, userData) => {
		return new Promise( (resolve, reject) => {
			const {userId, newFName, newLName, newEmail, newPassword} = userData;
			console.log("\n\n\nuserData>>>>", JSON.stringify(userData)+"\n\n");
			dbConn.query(query, [newFName, newLName, newEmail, newPassword, userId], (err, results) => {
				if(err) {
					reject(err);
				}
				resolve(results);
			})
		});
	},
	SAVE_TOKEN : (dbConn, query, data) => {
		return new Promise( (resolve, reject) => {
			const {userId, token} = data;
			dbConn.query(query, [token, userId], (err, results) => {
				if(err) 
					reject(err);
				resolve(results);	
			});
		});
	},
	signup : (dbConn, query, data) => {
		return new Promise( (resolve, reject) => {
			const {firstName, lastName, email, password} = data;
			dbConn.query( query, [firstName, lastName, email, password], (err, result) => {
				if(err)  {
					reject(err);
				}
				resolve(result);
			});
		});
	}
};

module.exports = models;
