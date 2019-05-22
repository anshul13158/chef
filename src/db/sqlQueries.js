//File contains all sql queries
const queries = {
	FETCH_ALL : 'SELECT * FROM users',
	FIND_USER_MAIL : 'SELECT * FROM users WHERE email = ?',
	UPDATE_USER : 'UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE userId = ?',
	SAVE_TOKEN : 'INSERT INTO tokens (userId, token) VALUES (?,?)',
};

module.exports = queries;