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
      Song.belongsTo(
        models.User,
        {foreignKey: 'userId', as: 'Artist'}
      );

      Song.belongsTo(
        models.Album,
        {foreignKey: 'albumId'}
      );

      Song.hasMany(
        models.Comment,
        {foreignKey: 'songId'}
      );

      Song.belongsToMany(
        models.Playlist,
        {
          through: models.PlaylistSong,
          foreignKey: 'songId'
        }
      );
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
      allowNull: false,
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
