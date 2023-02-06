import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory} from 'react-router-dom';
import { createSong } from '../../store/songs';
import { getUserAlbums } from '../../store/albums';


import './CreateSongForm.css';

const CreateSongForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const albums = Object.values(useSelector(state => state.albums));

  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audio, setAudio] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [previewPreview, setPreviewPreview] = useState('')
  const [validImage, setValidImage]= useState(true);
  const [loadedImg, setLoadedImg] = useState(true);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // useEffect(() => {
  //   return () => dispatch(resetSong());
  // }, [])

  useEffect(() => {
    if(sessionUser) {
      dispatch(getUserAlbums(sessionUser.id));
    }
  }, [dispatch, sessionUser])

  useEffect(() => {
    const errors = [];

    if(title.length < 1 || title.length > 64) errors.push('Please provide a title with between 1-64 characters.');
    if(description.length > 255) errors.push('Description must be less than 255 characters.');
    // if(!audio) errors.push('Audio is required');
    if(!(audio && audio.type.startsWith('audio'))) errors.push('Must choose a valid audio file');
    if(!validImage) errors.push('Song Image must be valid image url or blank.');
    setValidationErrors(errors);
  }, [title, description, audio, validImage])

  useEffect(() => {
    if(albumId) {

      const album = albums.find(album => album.id === Number(albumId));
      if(album) setPreviewImage(album.previewImage);
      console.log('Album img', album.previewImage)
    }
  }, [albumId]);

  useEffect(() => {
    setLoadedImg(false)
    let timeout = setTimeout(() => {setPreviewPreview(previewImage); setLoadedImg(true)}, 100);

    return () => {
      clearTimeout(timeout);
    }
  }, [previewImage])

  // if(newSong) {
  //   return <Redirect to={`/songs/${newSong.id}`} />;
  // }

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const outerPayload = {
      albumId,
      payload: {
        title,
        description,
        audio,
        previewImage
      }
    }


    let song;
    if(!validationErrors.length) {
      song = await dispatch(createSong(outerPayload));
      if(song.errors) {
        setValidationErrors(song.errors);
      } else {
        history.push(`/songs/${song.id}`)
      }
    }

  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudio(file);
  };

  return (
    <form onSubmit={onSubmit} className='basic-form create-song-form' >
      { validationErrors.length > 0 && hasSubmitted &&
      <div className='errorBox'>
        {validationErrors.map((err, i) => <div className='err-message' key={i}>{err}</div>)}
      </div>
      }
      { albums.length > 0 && <div className='formElement' >
        <label htmlFor="album">Album</label>
        <select
        id='album'
        value={albumId}
        onChange={e => setAlbumId(e.target.value)}
        >
          <option value=''>None</option>
          {albums.map(album => (
            <option value={album.id}>{album.title}</option>
          ))}
        </select>
      </div>}

      <div className='formElement' >
        <label htmlFor="title">Song Title</label>
        <input
        id='title'
        type='text'
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="description">Description</label>
        <input
        id='description'
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className='formElement audio-form-element' >
        <label htmlFor="audio"><div className='form-audio-button'>Choose Audio File</div></label>
        <input
        id='audio'
        type='file'
        onChange={updateFile}
        className="form-audio"
        />
        <div className='audio-file-name'>{!!audio && audio.name}</div>
      </div>

      { (!albumId && <div className='formElement' >
        <label htmlFor="previewImage">Song Image</label>
        <input
        id='previewImage'
        type='text'
        value={previewImage}
        onChange={e => {setPreviewImage(e.target.value); setValidImage(true)}}
        />
        { previewPreview !== '' && <img onError={(e) => setValidImage(false)} src={previewPreview} className='form-prev-image'/>}
      </div>)}

      <div className='form-bottom-buttons'>
        <Link to={`/users/${sessionUser.id}`}>
          <button className='formElement'>Cancel</button>
        </Link>
        <button disabled={!loadedImg} className='formElement' type='submit'>Create Song</button>
      </div>

    </form>
  );
}

export default CreateSongForm;
