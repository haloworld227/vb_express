const db = require('../config/database');
const User = db.import('../models/user');
const Venue = require('../controllers/venue');
const UserVenueBooking = db.import('../models/user_venue_booking');

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
	},
	find: function(id) {
		return User.findOne({
			where: {
				id: id
			}
		})
	},
	booking: function(client_id, venue_id, booking_date){
		return new Promise(function(resolve, reject) {
			UserVenueBooking.findOne({
				where: {
					venue_id: venue_id,
					booking_date: booking_date
				}
			})
			.then(function(entry) {
				if(!entry) {
					UserVenueBooking.create({
						client_id, client_id,
						venue_id, venue_id
					})
					.then(function(newEntry) {
						resolve(true)
					})
					.catch(function(err) {
						console.log(err);
					})
				}else {
					reject(false)
				}
			})
			.catch(function(err) {
				console.log(err);
			})
		})
	},
	getAllbookings: function(client_id, fn) {
		UserVenueBooking.findAll({
			attributes: ['venue_id'],
			where: {
				client_id: client_id
			}
		})
		.then(function(entries) {
			if(!entries) {
				fn(null)
			} else {
				Venue.findAllBookedByCurrentUser(entries)
				.then(function(allVenues) {
					fn(allVenues);
				})
			}
		})
	}
}
