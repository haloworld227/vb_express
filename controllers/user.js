const db = require('../config/database');
const user = db.import('../models/user');

module.exports = {
	create: function(req) {
		return user.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.pass,
			phone: req.body.phone,
			tempPassword: user.generatePassword()
		});
	},
	login: function(email, password, done){
		user.find({
			where: {
				email: email
			}
		})
		.then(function(user) {
			if(!user) {
				done(null, 'Incorrect Email');
			}else if(user.verifyPassword(password, user.password)) {
				done(null, 'Incorrect Password');
			}
			done(user);
		})
	}
}
