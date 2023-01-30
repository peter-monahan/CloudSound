'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Whis',
        lastName: 'This',
        email: 'whisthis@user.io',
        username: 'WhistlingThistle',
        previewImage: '/images/seed-images/DSC_0068[1]-02-01.jpeg',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Little',
        lastName: 'Flower',
        email: 'littleflower@user.io',
        username: 'LittleFlower',
        previewImage: '/images/seed-images/DSC_0101.JPG',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Home',
        lastName: 'Town',
        email: 'hometown@user.io',
        username: 'Nostalgia',
        previewImage: '/images/seed-images/DSC_0273.JPG',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'lil',
        lastName: 'Guy',
        email: 'lilguy@user.io',
        username: 'lilGuy',
        previewImage: '/images/seed-images/DSC_0486.JPG',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Water',
        lastName: 'Thoughts',
        email: 'waterthoughts@user.io',
        username: 'WaterThoughts',
        previewImage: '/images/seed-images/DSC_0664-1.jpg',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['WhistlingThistle', 'LittleFlower', 'Nostalgia', 'lilGuy', 'WaterThoughts'] }
    }, {});
  }
};
