'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static /*async*/ getCurrentUserById(id) {
      return /*await*/ User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
        // return await User.getCurrentUserById(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName}) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
      // return await User.getCurrentUserById(user.id);
    }

    static associate(models) {
      User.hasMany(
        models.Album,
        {foreignKey: 'userId'}
      );

      User.hasMany(
        models.Song,
        {foreignKey: 'userId'}
      );

      User.hasMany(
        models.Comment,
        {foreignKey: 'userId'}
      );

      User.hasMany(
        models.Playlist,
        {foreignKey: 'userId'}
      );
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 255],
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {exclude: ['hashedPassword']}
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
