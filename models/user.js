'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 8;

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			set: function(val) {
				this.setDataValue('password', this.hashPassword(val))
			}
		},
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
			}
	  	}
	});
  return user;
};
