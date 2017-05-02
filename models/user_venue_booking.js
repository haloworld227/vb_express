'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_venue_booking = sequelize.define('user_venue_booking', {
    client_id: DataTypes.INTEGER,
    venue_id: DataTypes.INTEGER,
	booking_date: {
		type: DataTypes.STRING
	}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_venue_booking;
};
