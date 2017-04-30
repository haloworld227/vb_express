const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { is_login: req.flash('is_login') } );
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('login', { message: req.flash('msg') || '', type: req.flash('type'), is_login: req.flash('is_login') });
});

router.post('/login', function(req, res) {
	User.login(req.body.email, req.body.password)
	.then(function(user) {
		req.flash('is_login', 't')
		res.redirect('users/'+user.id);
		// res.send('Success')
	})
	.catch(function(err) {
		console.log(err);
		req.flash('msg', err)
		req.flash('type', 'alert-danger')
		res.redirect('/login');
		// res.send('failed');
	});
});``

/* GET signup page. */
router.get('/signup', function(req, res, next) {
	res.render('signup', { message: req.flash('msg'), type: req.flash('type'), is_login: req.flash('is_login') });
});

router.post('/signup', function(req, res, next) {
	User.create(req)
	.then(function(row) {
		req.flash('msg', 'Account has been created. Login here.')
		req.flash('type', 'alert-success')
		res.redirect('/login')
	})
	.catch(function(err) {
		var msg = (err.errors[0].message === 'email must be unique') ? 'THIS EMAIL ADDRESS IS ALREADY TAKEN.' : 'An error occured. Try again';
		req.flash('msg', msg)
		req.flash('type', 'alert-danger')
		res.redirect('/');
	})
});

router.get('/logout', function(req, res) {
	res.redirect('/');
});

module.exports = router;
