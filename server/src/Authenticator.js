const users = {
	johann: {password:'johann'},
	sassi: {password:'sassi'},
}

class Authenticator {
	static authenticate(user, password) {
		let authenticated = false;
		if (users[user]) authenticated = users[user].password === password;
		return authenticated;
	}
}

module.exports = Authenticator;
