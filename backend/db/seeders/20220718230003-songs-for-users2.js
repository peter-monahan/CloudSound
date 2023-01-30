'use strict';

const { User, Song } = require('../models');

const userSongs = [
  {
    username: 'WhistlingThistle',
    songs: [
      {title: "Groundhog Day", description: 'All over again.', url: 'https://cloudsoundmusic.s3.amazonaws.com/1674785914298.mp3', previewImage: '/images/seed-images/DSC_0052-01.jpeg'},
      {title: "All my friends Withered.", description: 'At least I got the Nether Star.', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674786192997.mp3', previewImage: '/images/seed-images/DSC_0087-01.jpeg'},
    ]
  },
  // {
  //   username: 'LittleFlower',
  //   songs: [
  //     {title: 'Bogdanowicz: Holy Mary, Mother Of God', description: null, url: 'https://music.youtube.com/watch?v=1q7-OATGCTo&feature=share', previewImage: 'https://lh3.googleusercontent.com/C1LHuMn0OWr4e4d-7rZxZyAZReYEXe8bl2dvWJBEpbjOO7WD1wWfZJqpe40VjJ4CdbN-dOSSUEi4fQmH=w544-h544-l90-rj'},
  //     {title: 'Keating: Te Deum', description: null, url: 'https://music.youtube.com/watch?v=wVyR8fQtx5g&feature=share', previewImage: 'https://lh3.googleusercontent.com/C1LHuMn0OWr4e4d-7rZxZyAZReYEXe8bl2dvWJBEpbjOO7WD1wWfZJqpe40VjJ4CdbN-dOSSUEi4fQmH=w544-h544-l90-rj'},
  //   ]
  // },
  {
    username: 'Nostalgia',
    songs: [
      {title: 'We met at Chick-fil-A', description: 'And here we are.', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674788057608.mp3', previewImage: '/images/seed-images/1547057011872-5e6aa1fb-3c5b-49a3-a47c-8a4be5e1a713.jpg'},
      {title: 'Wayfaring', description: 'In a land of crying babies.', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674787567713.mp3', previewImage: '/images/seed-images/1547057011872-5e6aa1fb-3c5b-49a3-a47c-8a4be5e1a713.jpg'},
    ]
  },
  {
    username: 'lilGuy',
    songs: [
      {title: 'Blue and Gold', description: 'Are very nice colors', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674788257938.mp3', previewImage: '/images/seed-images/DSC_0199.JPG'},
      {title: 'Mac n\' cheese with hot sauce', description: 'A tasty combo. Zang!', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674788418448.mp3', previewImage: '/images/seed-images/DSC_0199.JPG'},
      {title: 'Broken phone in Brazil', description: 'Oh the horror!', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674788535727.mp3', previewImage: '/images/seed-images/DSC_0199.JPG'},
    ]
  },
  {
    username: 'WaterThoughts',
    songs: [
      {title: 'Gaudete Sunday', description: 'Rejoice!', url: 'https://cloudsoundmusic.s3.us-east-2.amazonaws.com/1674787172794.mp3', previewImage: '/images/seed-images/1547061368426-c0ddb21d-0927-4125-99ab-7658d9d35d23_.jpg'},
      // {title: 'SomeRealGoodStuff', description: null, url: 'https://music.youtube.com/watch?v=lYBUbBu4W08&feature=share', previewImage: ''},
    ]
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    // userSongs.forEach(async object => {
    //   const { username, songs } = object;
    //   const user = await User.findOne({where: {username}});
    //   console.log(user);
    //   songs.forEach(async song => {
    //     await user.createSong(song);
    //   });
    // });


    for (let i = 0; i < userSongs.length; i++) {
      const {username, songs} = userSongs[i];

      const user = await User.findOne({where: {username}});

      for (let j = 0; j < songs.length; j++) {
        const song = songs[j];
        await user.createSong(song);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ["Groundhog Day", "I alone survived the wither", 'Gaudete Sunday', 'Wayfaring', 'We met at Chick-fil-A', 'Blue and Gold', 'Mac n\' cheese with hot sauce', 'Broken phone in Brazil'] }
    }, {});
  }
};
