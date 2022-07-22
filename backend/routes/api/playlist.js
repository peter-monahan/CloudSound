const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Playlist, PlaylistSong } = require('../../db/models');

const validatePlaylist = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a name with at least 1 character.'),
  handleValidationErrors
];

const validatePlaylistEdit = [
  check('name')
    .if(check('name').exists({checkFalsy: true}))
    .isLength({ min: 1 })
    .withMessage('Please provide a name with at least 1 character.'),
  handleValidationErrors
];

router.post('/', requireAuth, validatePlaylist, async (req, res) => {
  const { name, previewImage} = req.body;
  const { user } = req;

  const playlist = await user.createPlaylist({name, previewImage});

  return res.json({playlist});
});

router.get('/:playlistId', async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId);

  if(playlist) {
    const songs = await playlist.getSongs({ joinTableAttributes: [] });
    return res.json({playlist, songs});
  } else {
    const err = new Error("The requested playlist couldn't be found.");
    err.title = "Playlist Not Found";
    err.errors = ["The requested playlist couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.post('/:playlistId', requireAuth, async (req, res, next) => {
  const { songId } = req.body;
  const { user } = req;
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId);
  const song = await Song.findByPk(songId);

  if(playlist) {
    if(song) {
      if(playlist.userId === user.id) {
        const [{id, playlistId, songId}] = await playlist.addSong(song);

        return res.json({id, playlistId, songId});
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
  } else {
    const err = new Error("The requested playlist couldn't be found.");
    err.title = "Playlist Not Found";
    err.errors = ["The requested playlist couldn't be found."];
    err.status = 404;
    return next(err);
}
});


module.exports = router;
