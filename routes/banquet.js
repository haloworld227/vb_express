const express = require('express');
const router = express.Router();
const Banq = require('../controllers/banquet');

/* This route will return all the registered banquets */
router.get('/', function(req, res) {
	Banq.findAll()
	.then(function(banqs) {
		if(!banqs[0]) {
			res.render('banq_all', {
				user: null,
				banqs: null,
				message: 'No banquet registered yet.',
				type: 'alert-danger',
			})
		} else {
			res.render('banq_all', {
				user: null,
				banqs: banqs
			})
		}
	})
});

router.get('/:b_id', function(req, res) {
	Banq.findOne(req.params.b_id)
	.then(function(banq) {
		res.render('banq_desc', {
			message: req.flash('msg'),
			type: req.flash('type'),
			banq: banq,
			user: null
		})
	})
})

module.exports = router;
