const express = require('express')
const router = express.Router();


const { validateSong, validateAlbum, validateAlbumEdit } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');




router.get('/', async (req, res) => {
  const albums = await Album.findAll();

  return res.json(albums.reduce((obj, el) => {obj[el.id] = el; return obj}, {}));
});

router.post('/', requireAuth, validateAlbum, async (req, res) => {
  const { title, description, previewImage} = req.body;
  const { user } = req;

  const album = await user.createAlbum({title, description, previewImage});

  return res.json(album);
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
    return res.json(album);
  } else {
    const err = new Error("The requested album couldn't be found.");
    err.title = "Album Not Found";
    err.errors = ["The requested album couldn't be found."];
    err.status = 404;
    return next(err);
  }
});

router.put('/:albumId', requireAuth, validateAlbumEdit, async (req, res, next) => {
  const { title, description, previewImage} = req.body;
  const obj = { title, description, previewImage };
  const { user } = req;
  const { albumId } = req.params;
  const setObj = {};
  const album = await Album.findByPk(albumId);

  for (const key in obj) {
    const element = obj[key];
    if (element !== undefined) {
      setObj[key] = element;
    }
  }
  if(album) {
    if(album.userId === user.id) {
      album.set(setObj);
      await album.save();
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested album couldn't be found.");
      err.title = "Album Not Found";
      err.errors = ["The requested album couldn't be found."];
      err.status = 404;
      return next(err);
  }


  return res.json(album);
});

router.delete('/:albumId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId);


  if(album) {
    if(album.userId === user.id) {
      await album.destroy();

      return res.json({ message: `succesfully deleted album: '${album.title}' ` });
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
      const err = new Error("The requested album couldn't be found.");
      err.title = "Album Not Found";
      err.errors = ["The requested album couldn't be found."];
      err.status = 404;
      return next(err);
  }

});

router.post('/:albumId/songs', requireAuth, validateSong, async (req, res, next) => {
  const { title, description, url, previewImage } = req.body;
  const { user } = req;
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId);


  if(album) {
    if(album.userId === user.id) {
      const song = await album.createSong({userId: user.id, title, description, url, previewImage});

      return res.json(song);
    } else {
      const err = new Error("Unauthorized for this resource");
      err.title = "Forbidden";
      err.errors = ["Unauthorized for this resource"];
      err.status = 403;
      return next(err);
    }
  } else {
    const err = new Error("The requested album couldn't be found.");
    err.title = "Album Not Found";
    err.errors = ["The requested album couldn't be found."];
    err.status = 404;
    return next(err);
}
});
module.exports = router;
