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




router.get('/', requireAuth, (req, res) => {
  const {user} = req;
  const { token } = req.cookies;

  return res.json({...user.toSafeObject(), token});

});

router.post('/', validateLogin, async (req, res, next) => {
  let { credential, email, username, password } = req.body;

  credential = credential || email || username;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  let token = await setTokenCookie(res, user);

  return res.json({...user.toSafeObject(), token});
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

module.exports = router;
