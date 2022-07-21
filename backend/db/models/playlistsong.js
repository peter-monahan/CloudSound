'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaylistSong.init({
    songId: {
      type: DataTypes.INTEGER,
      // allowNull: false,// Breaks stuff with using model association methods
    },
    playlistId: {
      type: DataTypes.INTEGER,
      // allowNull: false, // Breaks stuff with using model association methods
    },
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};
