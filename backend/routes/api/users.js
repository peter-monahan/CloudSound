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

router.get('/:userId/songs', async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const songs = await user.getSongs();
    res.json({songs});
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/:userId/playlists', requireAuth, async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const playlists = await user.getPlaylists();
    res.json({playlists});
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/:userId/albums', requireAuth, async (req, res, next) => {
  const {userId} = req.params;
  const user = await User.findByPk(userId);

  if(user) {
    const albums = await user.getAlbums();
    res.json({albums});
  } else {
    const err = new Error("The requested user/artist couldn't be found.");
    err.title = "User/Artist Not Found";
    err.errors = ["The requested user/artist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});


module.exports = router;
