const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    /*return*/ next(err);
  }
  next();
};

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

const validatePlaylist = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a name with at least 1 character.'),
  handleValidationErrors
];

const validatePlaylistEdit = [
  check('name')
    .if(check('name').exists())
    .isLength({ min: 1 })
    .withMessage('Please provide a name with at least 1 character.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateSong,
  validateSongEdit,
  validateAlbum,
  validateAlbumEdit,
  validateLogin,
  validatePlaylist,
  validatePlaylistEdit,
  validateSignup
};
