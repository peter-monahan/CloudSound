'use strict';

const { User, Song, Album } = require('../models');

const userAlbums = [
  // {
  //   username: 'WhistlingThistle',
  //   songs: [
  //     {title: "Groundhog Day"},
  //     {title: "All my friends Withered."},
  //   ],
  //   album: { title: 'Sleepy'}
  // },
  // {
  //   username: 'LittleFlower',
  //   songs: [
  //     {title: 'Bogdanowicz: Holy Mary, Mother Of God'},
  //     {title: 'Keating: Te Deum'},
  //   ],
  //   album: { title: 'Holi'}
  // },
  {
    username: 'Nostalgia',
    songs: [
      {title: 'We met at Chick-fil-A'},
      {title: 'Wayfaring'},
    ],
    album: { title: 'First Stalgia' , description: 'Spatial audio of family life, with some music to drown out the cries of unhappy children.', previewImage: '/images/seed-images/1547057011872-5e6aa1fb-3c5b-49a3-a47c-8a4be5e1a713.jpg'}

  },
  {
    username: 'lilGuy',
    songs: [
      {title: 'Blue and Gold'},
      {title: 'Mac n\' cheese with hot sauce'},
      {title: 'Broken phone in Brazil'},
    ],
    album: { title: 'Brazilled' , description: 'A saga of flight, arrival, and disillusionment.', previewImage: '/images/seed-images/DSC_0199.JPG'}

  },
  // {
  //   username: 'WaterThoughts',
  //   songs: [
  //     {title: 'Bruno'},
  //     {title: 'SomeRealGoodStuff'},
  //   ],
  //   album: { title: 'FavFavTime'}

  // },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < userAlbums.length; i++) {
      const {username, songs, album} = userAlbums[i];

      const user = await User.findOne({where: {username}});
      const userAlbum = await user.createAlbum(album);

      for (let j = 0; j < songs.length; j++) {
        let { title } = songs[j];
        const song = await Song.findOne({where: {title}});
        await userAlbum.addSong(song);
      }
    }
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Sleepy', "Holi", 'Bam!', 'DooDeet', 'FavFavTime'] }
    }, {});
  }
};
