
'use strict';

const { User, Song, Playlist } = require('../models');

const songComments = [
  {
    username: 'PintsWithAquinas',
    songs: [
      {title: 'Trees'},
      {title: "Beer's in the Laundry"},
      {title: 'SomeRealGoodStuff'},
      {title: 'Bogdanowicz: Holy Mary, Mother Of God'},
      {title: 'Keating: Te Deum'},
    ],
    comment: { body: 'I love this song!!!!'}
  },
  {
    username: 'LittleFlower',
    songs: [
      {title: 'Trees'},
      {title: 'Formidable'},
    ],
    comment: { body: 'Very nice'}
  },
  {
    username: 'JDeezle',
    songs: [
      {title: 'Trees'},
      {title: "Emma's Playing Zelda"},
      {title: 'Morph'},
      {title: 'SomeRealGoodStuff'},
    ],
    comment: { body: 'Mood'}

  },
  {
    username: 'TOP',
    songs: [
      {title: "Emma's Playing Zelda"},
    ],
    comment: { body: 'slick beet yo'}

  },
  {
    username: 'JoDo',
    songs: [
      {title: 'Trees'},
      {title: 'SomeRealGoodStuff'},
    ],
    comment: { body: 'neva gon giv you up!!!!!'}

  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < songComments.length; i++) {
      const {username, songs, comment} = songComments[i];

      const user = await User.findOne({where: {username}});


      console.log(user.username);
      for (let j = 0; j < songs.length; j++) {
        let { title } = songs[j];
        const song = await Song.findOne({where: {title}});
        const { body } = comment;
        try {

          await song.createComment({userId: user.id, body});
        } catch (error) {
          console.log(error);
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments', {
      body: { [Op.in]: ['I love this song!!!!', "Very nice", 'Mood', 'slick beet yo', 'neva gon giv you up!!!!!'] }
    }, {});
  }
};
