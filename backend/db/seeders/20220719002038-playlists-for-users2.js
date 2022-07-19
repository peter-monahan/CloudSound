'use strict';

const { User, Song, Playlist } = require('../models');

const userPlaylists = [
  {
    username: 'PintsWithAquinas',
    songs: [
      {title: 'Trees'},
      {title: "Beer's in the Laundry"},
      {title: 'SomeRealGoodStuff'},
      {title: 'Bogdanowicz: Holy Mary, Mother Of God'},
      {title: 'Keating: Te Deum'},
    ],
    playlist: { name: 'Likes'}
  },
  {
    username: 'LittleFlower',
    songs: [
      {title: 'Trees'},
      {title: 'Formidable'},
    ],
    playlist: { name: 'Favs'}
  },
  {
    username: 'JDeezle',
    songs: [
      {title: 'Trees'},
      {title: "Emma's Playing Zelda"},
      {title: 'Morph'},
      {title: 'SomeRealGoodStuff'},
    ],
    playlist: { name: 'Mood'}

  },
  {
    username: 'TOP',
    songs: [
      {title: "Emma's Playing Zelda"},
      {title: 'Trees'},
      {title: 'Formidable'},
      {title: 'Bruno'},
      {title: 'SomeRealGoodStuff'},
    ],
    playlist: { name: 'NightNight'}

  },
  {
    username: 'JoDo',
    songs: [
      {title: 'Trees'},
      {title: 'SomeRealGoodStuff'},
    ],
    playlist: { name: 'FavFavFAVETime!!!'}

  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < userPlaylists.length; i++) {
      const {username, songs, playlist} = userPlaylists[i];

      const user = await User.findOne({where: {username}});
      const userPlaylist = await user.createPlaylist(playlist);


      console.log(user.username, userPlaylist.name);
      for (let j = 0; j < songs.length; j++) {
        let { title } = songs[j];
        const song = await Song.findOne({where: {title}});
        try {

          await userPlaylist.addSong(song);
        } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Playlists', {
      name: { [Op.in]: ['Likes', "Favs", 'Mood', 'NightNight', 'FavFavFAVETime!!!'] }
    }, {});
  }
};
