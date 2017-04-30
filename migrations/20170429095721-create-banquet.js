'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('banquets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
	  },
	  adv_pay: {
        type: Sequelize.INTEGER
      },
      total_pay: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      owner_id: {
        type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model:'users',
			key:'id'
		},
		onUpdate: 'cascade',
		onDelete: 'restrict'
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
    return queryInterface.dropTable('banquets');
  }
};
