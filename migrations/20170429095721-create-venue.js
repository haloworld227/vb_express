'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
		allowNull: false
      },
      location: {
        type: Sequelize.STRING,
		allowNull: false
      },
      city: {
        type: Sequelize.STRING,
		allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
	  },
	  adv_pay: {
        type: Sequelize.INTEGER,
		allowNull: false
      },
      total_pay: {
        type: Sequelize.INTEGER,
		allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
		allowNull: false
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
    return queryInterface.dropTable('venues');
  }
};
