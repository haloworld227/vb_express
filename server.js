const app = require('./app');

app.listen('3000', function(err) {
	if(err) throw new Error('App isn\'t able to listen');
	console.log('Running 3000...');
})
