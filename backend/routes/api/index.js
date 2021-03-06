// backend/routes/api/index.js


const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const playlistsRouter = require('./playlist.js');
const commentsRouter = require('./comments.js');

const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { User } = require('../../db/models');

// router.use(restoreUser);


router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/artists', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/playlists', playlistsRouter);

router.use('/comments', commentsRouter);

module.exports = router;
