'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(
        models.User,
        {foreignKey: 'userId', as: 'Artist'}
      );

      Album.hasMany(
        models.Song,
        {foreignKey: 'albumId'}
      );
    }
  }
  Album.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1, 64],
      }
    },
    description: {
      type: DataTypes.STRING(255),
      validate: {
        len: [1, 255],
      }
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
