const db = require('../config/database');
const Venue = db.import('../models/venue');
const UserVenueBooking = db.import('../models/user_venue_booking');

module.exports = {
	create: function(req) {
		return Venue.create({
				name: req.body.b_name,
				location: req.body.b_loc,
				city: req.body.city,
				phone: req.body.b_phone,
				capacity: req.body.cap,
				adv_pay: (parseInt(req.body.adv_pay) === 'NaN') ? 0 : req.body.adv_pay,
				total_pay: (parseInt(req.body.total_pay) === 'NaN') ? 0 : req.body.total_pay,
				description: req.body.b_desc,
				owner_id: req.params.id
			})
	},
	findOne: function(venue_id) {
		return Venue.findOne({
			where: {
				id: venue_id
			}
		});
	},
	findAllRegisteredByUser: function(owner_id) {
		return Venue.findAll( {
			where: {
				owner_id: owner_id
			}
		});
	},
	findAllBookedByCurrentUser: function(venues_ids) {
		var v_ids = [];
		for (var i = 0; i < venues_ids.length; i++) {
			v_ids.push(venues_ids[i].venue_id);
		}
		return Venue.findAll({
			where: {
				id: {
					$in: v_ids
				}
			}
		});
	},
	findAllByAllUsers: function() {
		return Venue.findAll();
	}
}
