const express = require('express')
const router = express.Router();


const { validateSignup } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const currentUserRouter = require('./current.js');


router.use('/current', currentUserRouter);


router.post('/', validateSignup, async (req, res) => {
  const {email, password, username, firstName, lastName} = req.body;
  let user = await User.signup({email, username, password, firstName, lastName});
  let token = await setTokenCookie(res, user);

  return res.json({...user.toSafeObject(), token});
});

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const { id, username, previewImage } = user;
    const songs = await user.getSongs({attributes: ['previewImage']});
    const albums = await user.getAlbums();

    res.json({id, username, totalSongs: songs.length, totalAlbums: albums.length, previewImage, songs});
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/:userId/songs', async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const songs = await user.getSongs();
    res.json(songs.reduce((obj, el) => {obj[el.id] = el; return obj;}, {}));
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/:userId/playlists', async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const playlists = await user.getPlaylists();
    res.json(playlists.reduce((obj, el) => {obj[el.id] = el; return obj;}, {}));
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/:userId/albums', async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const albums = await user.getAlbums();
    res.json(albums.reduce((obj, el) => {obj[el.id] = el; return obj;}, {}));
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});


module.exports = router;
