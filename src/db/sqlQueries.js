//File contains all sql queries
const queries = {
	FETCH_ALL : 'SELECT * FROM users',
	FIND_USER_MAIL : 'SELECT * FROM users WHERE email = ?',
	UPDATE_USER : 'UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE userId = ?',
	CREATE_NEW_USER : 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
};

module.exports = queries;