const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a title with at least 1 character.'),
  check('description')
    .if(check('description').exists())
    .isLength({ min: 1 })
    .withMessage('A description must have at least 1 character.'),
  handleValidationErrors
];

const validateAlbumEdit = [
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
  const albums = await Album.findAll();

  return res.json({albums});
});

router.post('/', requireAuth, validateAlbum, async (req, res) => {
  const { title, description, previewImage} = req.body;
  const { user } = req;

  const album = await user.createAlbum({title, description, previewImage});

  return res.json({album});
});


router.get('/:albumId', async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId, {include: [
    {
      model: User,
      as: 'Artist',
      attributes: ['id', 'username', 'previewImage']
    },
    {
      model: Song,
    }
  ]});
  if(album) {
    return res.json({album});
  } else {
    const err = new Error("The requested album couldn't be found.");
    err.title = "Album Not Found";
    err.errors = ["The requested album couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
