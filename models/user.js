'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 8;

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		name: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				min: 8
			},
			set: function(val) {
				this.setDataValue('password',val)
				this.setDataValue('hashPass', this.hashPassword(val))
			}
		},
		hashPass: DataTypes.STRING,
		phone: DataTypes.STRING,
		tempPassword: DataTypes.STRING,
		status: {
			type: DataTypes.ENUM('new', 'confirmed', 'active', 'disabled'),
			defaultValue: 'new'
		}
	},
	{
		instanceMethods: {
        	hashPassword: function (plain) {
				return bcrypt.hashSync(plain, saltRounds);
        	}
	  	},
		classMethods: {
	      	generatePassword: function() {
        		return crypto.randomBytes(8).toString('hex');
	      	},
			verifyPassword: function(plain, hash) {
				return bcrypt.compareSync(plain, hash)
			},
			associate: function(models) {
				// associations can be defined here
				User.hasMany(models.venues,{
					foreignKey: 'owner_id'
				});

				User.belongsToMany(models.venues, {
					through: models.user_venue_bookings
				});

			}
	  	}
	});
  return User;
};
