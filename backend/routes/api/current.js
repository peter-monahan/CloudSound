const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');

const validateLogin = [
  check('credential')
    .if(check('email').not().exists({ checkFalsy: true }))
    .if(check('username').not().exists({ checkFalsy: true }))
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];




router.get('/', (req, res) => {
  const {user} = req;

  if(user) {
    return res.json({user: user.toSafeObject()});
  } else {
    return res.json({});
  }
});

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

module.exports = router;
