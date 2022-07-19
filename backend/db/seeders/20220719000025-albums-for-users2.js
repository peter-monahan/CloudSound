'use strict';

const { User, Song, Album } = require('../models');

const userAlbums = [
  {
    username: 'PintsWithAquinas',
    songs: [
      {title: "Emma's Playing Zelda"},
      {title: "Beer's in the Laundry"},
    ],
    album: { title: 'Sleepy'}
  },
  {
    username: 'LittleFlower',
    songs: [
      {title: 'Bogdanowicz: Holy Mary, Mother Of God'},
      {title: 'Keating: Te Deum'},
    ],
    album: { title: 'Holi'}
  },
  {
    username: 'JDeezle',
    songs: [
      {title: 'Morph'},
    ],
    album: { title: 'Bam!'}

  },
  {
    username: 'TOP',
    songs: [
      {title: 'Trees'},
      {title: 'Formidable'},
    ],
    album: { title: 'DooDeet'}

  },
  {
    username: 'JoDo',
    songs: [
      {title: 'Bruno'},
      {title: 'SomeRealGoodStuff'},
    ],
    album: { title: 'FavFavTime'}

  },
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
