
'use strict';

const { User, Song, Playlist } = require('../models');

const songComments = [
  {
    username: 'WhistlingThistle',
    songs: [
      {title: 'Blue and Gold'},
      {title: "Mac n\' cheese with hot sauce"},
      {title: 'Broken phone in Brazil'},
      {title: 'Gaudete Sunday'},
      // {title: 'Keating: Te Deum'},
    ],
    comment: { body: 'I love this song!!!!'}
  },
  {
    username: 'LittleFlower',
    songs: [
      {title: 'Wayfaring'},
      {title: 'We met at Chick-fil-A'},
      {title: 'Blue and Gold'},
    ],
    comment: { body: 'Very nice'}
  },
  {
    username: 'Nostalgia',
    songs: [
      {title: 'Gaudete Sunday'},
      {title: "Mac n\' cheese with hot sauce"},
      {title: 'Groundhog Day'},
      // {title: 'SomeRealGoodStuff'},
    ],
    comment: { body: 'Mood'}

  },
  {
    username: 'lilGuy',
    songs: [
      {title: "Broken phone in Brazil"},
    ],
    comment: { body: 'slick beet yo'}

  },
  {
    username: 'WaterThoughts',
    songs: [
      {title: 'Blue and Gold'},
      // {title: 'SomeRealGoodStuff'},
    ],
    comment: { body: 'Hmmm, water is blue. Never thought about that before.'}

  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < songComments.length; i++) {
      const {username, songs, comment} = songComments[i];

      const user = await User.findOne({where: {username}});



      for (let j = 0; j < songs.length; j++) {
        let { title } = songs[j];
        const song = await Song.findOne({where: {title}});
        const { body } = comment;

        await song.createComment({userId: user.id, body});

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
