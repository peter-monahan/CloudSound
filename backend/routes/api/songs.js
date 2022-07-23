const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a title with at least 1 character.'),
  check('description')
    .if(check('description').exists())
    .isLength({ min: 1 })
    .withMessage('A description must have at least 1 character.'),
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a url for the audio'),
  handleValidationErrors
];

const validateSongEdit = [
  check('title')
    .if(check('title').exists())
    .isLength({ min: 1 })
    .withMessage('Please provide a title with at least 1 character.'),
  check('description')
    .if(check('description').exists())
    .isLength({ min: 1 })
    .withMessage('A description must have at least 1 character.'),
  handleValidationErrors
];


router.get('/', async (req, res) => {
  const songs = await Song.findAll();

  return res.json({songs});
});

router.post('/', requireAuth, validateSong, async (req, res) => {
  const { title, description, url, previewImage} = req.body;
  const { user } = req;

  const song = await user.createSong({title, description, url, previewImage});

  return res.json({song});
});

router.get('/:songId', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {include: [
    {
      model: User,
      as: 'Artist',
      attributes: ['id', 'username', 'previewImage']
    },
    {
      model: Album,
      attributes: ['id', 'title', 'previewImage']
    }
  ]});
  if(song) {
    return res.json({song});
  } else {
    const err = new Error("The requested song couldn't be found.");
    err.title = "Song Not Found";
    err.errors = ["The requested song couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.put('/:songId', requireAuth, validateSongEdit, async (req, res, next) => {
  const { title, description, url, previewImage } = req.body;
  const editObj = { title, description, url, previewImage }
  const { user } = req;
  const { songId } = req.params;
  const setObj = {}
  const song = await Song.findByPk(songId);

  for (const key in editObj) {
    const element = editObj[key];
    if (element !== undefined) {
      setObj[key] = element;
    }
  }
  if(song) {
    if(song.userId === user.id) {
      song.set(setObj);
      await song.save();
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested song couldn't be found.");
      err.title = "Song Not Found";
      err.errors = ["The requested song couldn't be found."];
      err.status = 404;
      return next(err);
  }


  return res.json({song});
});

router.delete('/:songId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { songId } = req.params;
  const song = await Song.findByPk(songId);


  if(song) {
    if(song.userId === user.id) {
      await song.destroy();

      return res.json({ message: `succesfully deleted song: '${song.title}' ` });
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested song couldn't be found.");
      err.title = "Song Not Found";
      err.errors = ["The requested song couldn't be found."];
      err.status = 404;
      return next(err);
  }

});

module.exports = router;
