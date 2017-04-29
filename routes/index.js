const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { isLogin: req.flash('isLogin') } );
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('login', { message: req.flash('msg') || '', type: req.flash('type'), isLogin: req.flash('isLogin') });
});

router.post('/login', function(req, res) {
	user.login(req.body.email, req.body.password)
	.then(function() {
		// req.flash('isLogin', 't')
		// req.flash('userId',user.id)
		// res.redirect('user/'+user.id+'/b/new');
		res.send('Success')
	})
	.catch(function(err) {
		// req.flash('msg', err)
		// req.flash('type', 'alert-danger')
		// res.redirect('/login');
		res.send('failed')
	});
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
	res.render('signup', { message: req.flash('msg'), type: req.flash('type'), isLogin: req.flash('isLogin') });
});

router.post('/signup', function(req, res, next) {
	user.create(req)
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

module.exports = router;
