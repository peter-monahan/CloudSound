const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');



router.get('/:songId', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {include: ['Artist', Album]});
  if(song) {
    return res.json({song});
  } else {
    const err = new Error("The requested song couldn't be found.");
    err.title = "Song Not Found";
    err.errors = ["The requested song couldn't be found."];
    err.status = 404;
    next(err);
  }
});

router.get('/', async (req, res) => {
  const songs = await Song.findAll();

  return res.json({songs});
});

router.post('/', requireAuth, async (req, res) => {


  return res.json({});
});

module.exports = router;
