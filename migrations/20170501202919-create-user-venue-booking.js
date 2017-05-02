'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_venue_bookings', {
      	id: {
        	allowNull: false,
        	autoIncrement: true,
        	primaryKey: true,
        	type: Sequelize.INTEGER
      	},
      	client_id: {
        	type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model:'users',
				key:'id'
			},
			onUpdate: 'cascade',
			onDelete: 'restrict'
      	},
      	venue_id: {
        	type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model:'venues',
				key:'id'
			},
			onUpdate: 'cascade',
			onDelete: 'restrict'
		},
		booking_date: {
	  		type: Sequelize.STRING,
	  		allowNull: false
		},
      	createdAt: {
        	allowNull: false,
        	type: Sequelize.DATE
      	},
      	updatedAt: {
        	allowNull: false,
        	type: Sequelize.DATE
      	}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_venue_bookings');
  }
};
