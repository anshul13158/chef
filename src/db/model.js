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
	}
};

module.exports = models;
