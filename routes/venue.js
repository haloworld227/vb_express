const express = require('express');
const router = express.Router();
const Venue = require('../controllers/venue');

/* This route will return all the registered venues */
router.get('/', function(req, res) {
	Venue.findAll()
	.then(function(venues) {
		if(!venues[0]) {
			res.render('venue_all', {
				user: null,
				venues: null,
				message: 'No venue registered yet.',
				type: 'alert-danger',
			})
		} else {
			res.render('venue_all', {
				user: null,
				venues: venues
			})
		}
	})
});

router.get('/:b_id', function(req, res) {
	Venue.findOne(req.params.b_id)
	.then(function(banq) {
		res.render('venue_desc', {
			message: req.flash('msg'),
			type: req.flash('type'),
			banq: banq,
			user: null
		})
	})
})

module.exports = router;
