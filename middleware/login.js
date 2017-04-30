module.exports.user = function(req, res, next) {
	User.find(req.params.id)
	.then(function(user) {
		if(!user){
			req.flash('msg', 'You need to login first.')
			req.flash('type', 'alert-danger')
			res.redirect('/login')
		}else {
			req.flash('is_login','t')
			req.user = user;
			next();
		}
	})
	.catch(function(err) {
		console.log(err);
	})
}
