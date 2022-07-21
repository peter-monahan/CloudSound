'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Matt',
        lastName: 'Fradd',
        email: 'mattfradd@user.io',
        username: 'PintsWithAquinas',
        previewImage: 'https://pintswithaquinas.com/favicon.ico',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Therese',
        lastName: 'Martin',
        email: 'therese.of.liseuix@user.io',
        username: 'LittleFlower',
        previewImage: 'https://www.littleflower.org/wp-content/uploads/2020/12/St-Therese-1440x825.jpg',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Josh',
        lastName: 'Dun',
        email: 'junn@user.io',
        username: 'JDeezle',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tyler',
        lastName: 'Joseph',
        email: 'tyjoe@user.io',
        username: 'TOP',
        previewImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Twenty_one_pilots_logo_.jpg',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'jdoe@user.io',
        username: 'JoDo',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['PintsWithAquinas', 'LittleFlower', 'JDeezle', 'TOP', 'JoDo'] }
    }, {});
  }
};
