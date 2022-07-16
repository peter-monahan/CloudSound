// backend/routes/index.js
const express = require('express');
const router = express.Router();

const path = require('path');

const { setTokenCookie, restoreUser, requireAuth} = require('../utils/auth.js');
const apiRouter = require('./api');

router.use(restoreUser);

router.use('/api', apiRouter);

router.get('/api/csrf/restore', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken);
  res.status(200);
  res.json({
    'XSRF-TOKEN': csrfToken
  });
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

router.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.js'));
});

router.get('/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.css'));
});

module.exports = router;
