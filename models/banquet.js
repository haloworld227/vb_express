'use strict';
module.exports = function(sequelize, DataTypes) {
  var banquet = sequelize.define('banquet', {
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
		banquet.belongsTo(models.users, {
				foreignKey: 'owner_id',
				allowNull: false
			});
      }
    }
  });
  return banquet;
};
