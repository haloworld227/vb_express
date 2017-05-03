const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { user : null });
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('login', { message: req.flash('msg') || '', type: req.flash('type'), user: null });
});

router.post('/login', function(req, res) {
	User.login(req.body.email, req.body.password)
	.then(function(user) {
		res.redirect('users/'+user.id);
	})
	.catch(function(err) {
		console.log(err);
		req.flash('msg', err)
		req.flash('type', 'alert-danger')
		res.redirect('/login');
	});
});``

/* GET signup page. */
router.get('/signup', function(req, res) {
	res.render('signup', { message: req.flash('msg'), type: req.flash('type'), user: null });
});

router.post('/signup', function(req, res) {
	User.create(req)
	.then(function(row) {
		if(!row) {
			req.flash('msg', 'Account has not been created. Login here.')
			req.flash('type', 'alert-danger')
			res.redirect('/signup')
		} else {
			req.flash('msg', 'Account has been created. Login here.')
			req.flash('type', 'alert-success')
			res.redirect('/login')
		}
	})
	.catch(function(err) {
		req.flash('msg', err.errors)
		req.flash('type', 'alert-danger')
		res.redirect('/');
	})
});

router.get('/logout', function(req, res) {
	res.redirect('/');
});

module.exports = router;
