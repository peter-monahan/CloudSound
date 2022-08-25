// backend/routes/index.js
const express = require('express');
const router = express.Router();

const path = require('path');

const { setTokenCookie, restoreUser, requireAuth} = require('../utils/auth.js');
const apiRouter = require('./api');

router.use(restoreUser);

router.use('/api', apiRouter);



if (process.env.NODE_ENV === 'production') {

router.get('/', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return res.sendFile(
    path.resolve(__dirname, '../../frontend', 'build', 'index.html')
  )
});

router.use(express.static(path.resolve("../frontend/build")));

router.get(/^(?!\/?api).*/, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return res.sendFile(
    path.resolve(__dirname, '../../frontend', 'build', 'index.html')
  );
});

} else {

  router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200);
    res.json({
      'XSRF-TOKEN': csrfToken
    });
  });
}

module.exports = router;
