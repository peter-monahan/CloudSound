const express = require('express');
const router = express.Router();

const { validateComment, validateCommentEdit } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Comment, Song, User} = require('../../db/models');


router.post('/', requireAuth, validateComment, async (req, res, next) => {
  const { songId, user } = req;
  const { body } = req.body;

  const song = await Song.findByPk(songId);

  if(song) {
    const comment = await song.createComment({userId: user.id, body});

    res.json({comment});
  } else {
    const err = new Error("The requested song couldn't be found.");
    err.title = "Song Not Found";
    err.errors = ["The requested song couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  const { songId } = req;

  const song = await Song.findByPk(songId);

  if(song) {
    const comments = await song.getComments({
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]});

    res.json(comments);
  } else {
    const err = new Error("The requested song couldn't be found.");
    err.title = "Song Not Found";
    err.errors = ["The requested song couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.put('/:commentId', requireAuth, validateCommentEdit, async (req, res, next) => {
  const { body } = req.body;
  const { user } = req;
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);


  if(comment) {
    if(comment.userId === user.id) {
      comment.set({body});
      await comment.save();
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested comment couldn't be found.");
      err.title = "Comment Not Found";
      err.errors = ["The requested comment couldn't be found."];
      err.status = 404;
      return next(err);
  }


  return res.json({comment});
});

router.delete('/:commentId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId);


  if(comment) {
    if(comment.userId === user.id) {
      await comment.destroy();

      return res.json({ message: `succesfully deleted comment: '${comment.body}' ` });
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested comment couldn't be found.");
      err.title = "Comment Not Found";
      err.errors = ["The requested comment couldn't be found."];
      err.status = 404;
      return next(err);
  }

});


module.exports = router;
