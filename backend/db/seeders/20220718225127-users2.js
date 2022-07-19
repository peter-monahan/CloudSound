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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Therese',
        lastName: 'Martin',
        email: 'therese.of.liseuix@user.io',
        username: 'LittleFlower',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Josh',
        lastName: 'Dunn',
        email: 'junn@user.io',
        username: 'JDeezle',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tyler',
        lastName: 'Joseph',
        email: 'tyjoe@user.io',
        username: 'TOP',
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
