const db = require('../config/database');
const Banq = db.import('../models/banquet');

module.exports = {
	create: function(req) {
		return Banq.create({
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
	findOne: function(owner_id, banquet_id) {
		return Banq.findOne({
			where: {
				id: banquet_id
			}
		});
	},
	findAll: function() {
		return Banq.findAll();
	}
}
