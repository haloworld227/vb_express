var Sequelize = require('sequelize');
var config    = require('./config').development;

var sequelize = new Sequelize(config.database, config.username, config.password, config)
sequelize.sync({ force: true })
.then(function() {

})
.catch(function(err) {
	console.log(err);
})

module.exports = sequelize;
