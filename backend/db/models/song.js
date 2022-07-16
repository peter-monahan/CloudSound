'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
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
    url: {
      type: DataTypes.STRING,

    },
    previewImage: {
      type: DataTypes.STRING,

    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
