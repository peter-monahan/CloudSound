const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');





router.get('/songs', requireAuth, async (req, res) => {
  const { user } = req;

  const songs = await user.getSongs();
  res.json({songs});
});

router.get('/playlists', requireAuth, async (req, res) => {
  const { user } = req;

  const playlists = await user.getPlaylists();
  res.json({playlists});
});

router.get('/albums', requireAuth, async (req, res) => {
  const { user } = req;

  const albums = await user.getAlbums();
  res.json({albums});
});

module.exports = router;
