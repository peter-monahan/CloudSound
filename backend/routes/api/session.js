const express = require('express')
const router = express.Router();


const { validateLogin } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const currentUserRouter = require('./current.js');

const { User } = require('../../db/models');



router.use('/', currentUserRouter);


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
