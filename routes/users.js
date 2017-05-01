const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const Banq = require('../controllers/banquet');

user_middleware = function(req, res, next) {
	User.find(req.params.id)
	.then(function(user) {
		if(!user){
			req.flash('msg', 'You need to login first.')
			req.flash('type', 'alert-danger')
			res.redirect('/login')
		}else {
			req.user = user;
			next();
		}
	})
	.catch(function(err) {
		console.log(err);
	})
}

/* GET users Dashboard. */
router.get('/:id', user_middleware, function(req, res) {
	res.render('dashboard', { user: req.user });
});

/* Register a banquet */
router.get('/:id/b/new', user_middleware, function(req, res) {
	res.render('banq_reg', {
		message: req.flash('msg'),
		type: req.flash('type'),
		user: req.user
	})
})

router.post('/:id/b/new', user_middleware, function(req, res) {
	Banq.create(req)
	.then(function(banq) {
		res.redirect('/users/'+req.params.id+'/b/'+banq.id); //get banquet details
	})
	.catch(function(err) {
		res.send('Failed: '+err)
	})
})

/* This route will return all the registered banquets by current user */
router.get('/:id/b', user_middleware, function(req, res) {
	Banq.findAllByUser(req.user.id)
	.then(function(banqs) {
		if(!banqs[0]) {
			res.render('banq_all', {
				user: req.user,
				banqs: null,
				message: 'No banquet registered yet.',
				type: 'alert-danger'
			})
		} else {
			res.render('banq_all', {
				user: req.user,
				banqs: banqs
			})
		}
	})
})

/* This route will return all the registered banquets by all user */
router.get('/:id/b/all', user_middleware, function(req, res) {
	Banq.findAll()
	.then(function(banqs) {
		if(!banqs[0]) {
			res.render('banq_all', {
				user: req.user,
				banqs: null,
				message: 'No banquet registered yet.',
				type: 'alert-danger',
			})
		} else {
			res.render('banq_all', {
				user: req.user,
				banqs: banqs
			})
		}
	})
});

/* Get the details of banquet whose id is b_id*/
router.get('/:id/b/:b_id', user_middleware, function(req, res) {
	Banq.findOne(req.params.b_id)
	.then(function(banq) {
		res.render('banq_desc', {
			message: req.flash('msg'),
			type: req.flash('type'),
			banq: banq,
			user: req.user
		})
	})
})

/* Book the banquet whose id is b_id against the user whose id is 'id'*/
router.post('/:id/b/:b_id', user_middleware, function(req, res) {
	res.render('banq_desc', {
		message: req.flash('msg'),
		type: req.flash('type'),
		user: req.user
	})
})

module.exports = router;
