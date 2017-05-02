'use strict';
module.exports = function(sequelize, DataTypes) {
  var Venue = sequelize.define('venue', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    adv_pay: DataTypes.INTEGER,
    total_pay: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    owner_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		Venue.belongsTo(models.users, {
				foreignKey: 'owner_id',
				allowNull: false
			});


		Venue.belongsToMany(models.users, {
			through: models.user_venue_bookings
		});
      }
    }
  });
  return Venue;
};
