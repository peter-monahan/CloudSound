'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      );

      Comment.belongsTo(
        models.Song,
        {foreignKey: 'songId'}
      );
    }
  }
  Comment.init({
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255],
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
