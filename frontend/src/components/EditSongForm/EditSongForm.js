import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getSong, editSong, deleteSong } from '../../store/songs';


import './EditSongForm.css';

const EditSongForm = () => {
  const {songId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.songs[songId]);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
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
    dispatch(getSong(songId))
  }, [songId]);

  useEffect(() => {
    if(song) {
      setTitle(song.title);
      setDescription(song.description);
      setUrl(song.url);
      setPreviewImage(song.previewImage);
    }
  }, [song])

  useEffect(() => {
    const errors = [];

    if(title.length < 1 || title.length > 64) errors.push('Please provide a title with between 1-64 characters.');
    if(description && description.length > 255) errors.push('Description must be less than 255 characters.');
    // if(!url) errors.push('URL is required');
    if(!validImage) errors.push('Song Image must be valid image url or blank.');
    setValidationErrors(errors);
  }, [title, description, url, validImage])


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

  const destroySong = async (e) => {
    e.preventDefault();

    dispatch(deleteSong(songId));

    history.push(`/users/${sessionUser.id}`)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const outerPayload = {
      songId,
      payload: {
        title,
        description,
        previewImage
      }
    }


    let song;
    if(!validationErrors.length) {
      song = await dispatch(editSong(outerPayload));
      console.log(song)
      if(song.errors) {
        setValidationErrors(song.errors);
      } else {
        history.push(`/songs/${songId}`);
      }
    }

  }

  return (
    <form onSubmit={onSubmit} className='basic-form edit-song-form' >
      { validationErrors.length > 0 && hasSubmitted &&
      <ul className='errorBox'>
        {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      }

      <div className='formElement' >
        <label htmlFor="title">Song Title:</label>
        <input
        id='title'
        type='text'
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="description">Description:</label>
        <input
        id='description'
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* <div className='formElement' >
        <label htmlFor="url">Audio Url:</label>
        <input
        id='url'
        type='text'
        value={url}
        onChange={e => setUrl(e.target.value)}
        />
      </div> */}

      { (song && !song.albumId && <div className='formElement' >
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
        <Link to={`/songs/${songId}`}>
          <button className='formElement'>Cancel</button>
        </Link>
      <button onClick={destroySong}>Delete Song</button>
      <button disabled={!loadedImg} className='formElement' type='submit'>Save Changes</button>
      </div>

    </form>
  );
}

export default EditSongForm;
