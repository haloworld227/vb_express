const db = require('../config/database');
const User = db.import('../models/user');

module.exports = {
	create: function(req) {
		return User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.pass,
			phone: req.body.phone,
			tempPassword: User.generatePassword()
		});
	},
	login: function(email, password){
		return new Promise(function(resolve, reject) {
			User.find({
				where: {
					email: email
				}
			})
			.then(function(user) {
				if(!user) {
					reject('Incorrect Email');
				}else if(!User.verifyPassword(password, user.password)) {
					reject('Incorrect Password');
				}
				resolve(user);
			}).catch(function(err) {
				reject(err)
			})
		})
	}
}
