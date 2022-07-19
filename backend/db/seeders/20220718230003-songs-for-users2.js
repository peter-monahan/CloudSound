'use strict';

const { User, Song } = require('../models');

const userSongs = [
  {
    username: 'PintsWithAquinas',
    songs: [
      {title: "Emma's Playing Zelda", description: 'Chilled', url: 'https://music.youtube.com/watch?v=1ypusqDvc4g&feature=share', previewImage: 'https://lh3.googleusercontent.com/_r0ZphX86DThsBN2svj2BRdupgfqVGPRgK8hfWQEjFV6kTdcLdNVP9P04M7Mvz3ZAB4UsZo0qZX7lc1WhQ=w544-h544-l90-rj'},
      {title: "Beer's in the Laundry", description: 'Chillered', url: 'https://music.youtube.com/watch?v=SGjIM-Incyk&feature=share', previewImage: 'https://lh3.googleusercontent.com/_r0ZphX86DThsBN2svj2BRdupgfqVGPRgK8hfWQEjFV6kTdcLdNVP9P04M7Mvz3ZAB4UsZo0qZX7lc1WhQ=w544-h544-l90-rj'},
    ]
  },
  {
    username: 'LittleFlower',
    songs: [
      {title: 'Bogdanowicz: Holy Mary, Mother Of God', description: null, url: 'https://music.youtube.com/watch?v=1q7-OATGCTo&feature=share', previewImage: 'https://lh3.googleusercontent.com/C1LHuMn0OWr4e4d-7rZxZyAZReYEXe8bl2dvWJBEpbjOO7WD1wWfZJqpe40VjJ4CdbN-dOSSUEi4fQmH=w544-h544-l90-rj'},
      {title: 'Keating: Te Deum', description: null, url: 'https://music.youtube.com/watch?v=wVyR8fQtx5g&feature=share', previewImage: 'https://lh3.googleusercontent.com/C1LHuMn0OWr4e4d-7rZxZyAZReYEXe8bl2dvWJBEpbjOO7WD1wWfZJqpe40VjJ4CdbN-dOSSUEi4fQmH=w544-h544-l90-rj'},
    ]
  },
  {
    username: 'JDeezle',
    songs: [
      {title: 'Morph', description: 'Wowie', url: 'https://music.youtube.com/watch?v=rYuBU7YzZ-c&feature=share', previewImage: 'https://lh3.googleusercontent.com/g8g0VH_6UKxlXXkK8rNkxqJFJVgxlegkrKRcjd7BuMlCMgyLUFDiv7cdjqsUbXq490OrKCWvlAIciJU=w544-h544-l90-rj'},
    ]
  },
  {
    username: 'TOP',
    songs: [
      {title: 'Trees', description: null, url: 'https://music.youtube.com/watch?v=i0LKHoMYhj4&feature=share', previewImage: 'https://lh3.googleusercontent.com/9MMr9DGUEZrcVeX5mB86i8tnbwK4Q2Q9xEyqHRftW1NEezE2v_psG5U8SQ8cU3-cgDe0F5XvWGGmbmRu8A=w544-h544-l90-rj'},
      {title: 'Formidable', description: null, url: 'https://music.youtube.com/watch?v=UoNSBtZgtQ0&feature=share', previewImage: 'https://lh3.googleusercontent.com/9eiT-rk3RS3VsQDyIDtTmrxg-l58WwiaxKXhc-wuDmUD72Ny3x8sEXuneR3mkFyprG_xbOdNZ7i24x8=w544-h544-l90-rj'},
    ]
  },
  {
    username: 'JoDo',
    songs: [
      {title: 'Bruno', description: null, url: 'https://music.youtube.com/watch?v=bvWRMAU6V-c&feature=share', previewImage: ''},
      {title: 'SomeRealGoodStuff', description: null, url: 'https://music.youtube.com/watch?v=lYBUbBu4W08&feature=share', previewImage: ''},
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
      console.log(user);
      for (let j = 0; j < songs.length; j++) {
        const song = songs[j];
        await user.createSong(song);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ["Emma's Playing Zelda", "Beer's in the Laundry", 'Bogdanowicz: Holy Mary, Mother Of God', 'Keating: Te Deum', 'Morph', 'Trees', 'Formidable', 'Bruno', 'SomeRealGoodStuff'] }
    }, {});
  }
};
