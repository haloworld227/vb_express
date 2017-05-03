const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Venue = require('../controllers/venue');

user_middleware = function(req, res, next) {
	User.find(req.params.id)
	.then(function(user) {
		if(!user){
			req.flash('msg', 'You need to login first.')
			req.flash('type', 'alert-danger')
			res.redirect('/login')
		}else {
			req.user = user;
			if(req.params.v_id) {
				Venue.findOne(req.params.v_id)
				.then(function(venue) {
					req.venue = venue;
					next();
				});
			} else {
				next();
			}
		}
	})
	.catch(function() {
		res.redirect('/users/'+req.user.id);
	})
}

/* GET users Dashboard. */
router.get('/:id', user_middleware, function(req, res) {
	res.render('dashboard', { user: req.user });
});

/* Register a venue */
router.get('/:id/v/new', user_middleware, function(req, res) {
	res.render('venue_reg', {
		message: req.flash('msg'),
		type: req.flash('type'),
		user: req.user
	})
})

router.post('/:id/v/new', user_middleware, function(req, res) {
	Venue.create(req)
	.then(function(venue) {
		res.redirect('/users/'+req.params.id+'/v/'+venue.id); //get venue details
	})
	.catch(function() {
		res.redirect('/users/'+req.user.id);
	})
})

/* This route will return all the registered venues by current user */
router.get('/:id/v', user_middleware, function(req, res) {
	Venue.findAllRegisteredByUser(req.user.id)
	.then(function(venues) {
		if(!venues[0]) {
			res.render('venue_all', {
				user: req.user,
				venues: null,
				message: 'No venues have been registered by you.',
				type: 'alert-info'
			})
		} else {
			res.render('venue_all', {
				user: req.user,
				venues: venues,
				message: req.flash('msg'),
				type: req.flash('type')
			})
		}
	})
	.catch(function() {
		res.redirect('/users/'+req.user.id);
	})
})

/* This route will return all the registered venues by all user */
router.get('/:id/v/all', user_middleware, function(req, res) {
	Venue.findAllByAllUsers()
	.then(function(venues) {
		if(!venues[0]) {
			res.render('venue_all', {
				user: req.user,
				venues: null,
				message: 'No venue registered yet.',
				type: 'alert-info',
			})
		} else {
			res.render('venue_all', {
				user: req.user,
				venues: venues,
				message: req.flash('msg'),
				type: req.flash('type')
			})
		}
	})
	.catch(function() {
		res.redirect('/users/'+req.user.id);
	})
});

/* Get the details of venue whose id is v_id*/
router.get('/:id/v/:v_id', user_middleware, function(req, res) {
	res.render('venue_desc', {
		message: req.flash('msg'),
		type: req.flash('type'),
		venue: req.venue,
		user: req.user
	})
})

/* Book the venue whose id is v_id against the user whose id is 'id'*/
router.post('/:id/v/:v_id', user_middleware, function(req, res) {
	User.booking(req.user.id, req.venue.id, req.body.booking_date)
	.then(function() {
		// res.send('Succeeded')
		res.redirect('/users/'+req.user.id+'/b');
	})
	.catch(function(err) {
		req.flash('msg', err);
		req.flash('type', 'alert-danger');
		// res.send('Failed')
		res.redirect('/users/'+req.user.id+'/v/'+req.venue.id);
	})
})

/*Get all venues booked by current user*/
router.get('/:id/b', user_middleware, function(req, res) {
	User.getAllbookings(req.user.id)
	.then(function(venues) {
		res.render('venue_all', {
			message: req.flash('msg'),
			type: req.flash('type'),
			venues: venues,
			user: req.user
		});
	})
	.catch(function(err) {
		res.render('venue_all', {
			message: 'No bookings yet.',
			type: 'alert-info',
			venues: null,
			user: req.user
		});
	})
});

module.exports = router;
