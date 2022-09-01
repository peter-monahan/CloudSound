import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSong } from '../../store/display';

import './CreateSongForm.css';

const CreateSongForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const newSong = useSelector(state => state.display.song);
  const albums = useSelector(state => state.albums);

  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    if(sessionUser) {
      // dispatch(getUserAlbums(sessionUser.id));
    }
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    if(title.length < 1 || title.length > 64) errors.push('Please provide a title with between 1-64 characters.');
    if(description.length > 255) errors.push('Description must be less than 255 characters.');
    if(!url) errors.push('URL is required');
    setValidationErrors(errors);
  }, [title, description, url])

  if(newSong) {
    return <Redirect to={`/songs/${newSong.id}`} />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const outerPayload = {
      albumId,
      payload: {
        title,
        description,
        url,
        previewImage
      }
    }


    let resErrors;
    if(!validationErrors.length) {
      resErrors = await dispatch(createSong(outerPayload));
      if(resErrors) {
        setValidationErrors(resErrors.errors);
      }
    }

  }

  return (
    <form onSubmit={onSubmit} className='create-song-form' >
      { validationErrors.length > 0 && hasSubmitted &&
      <ul className='errorBox'>
        {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      }
      <div className='formElement' >
        <label htmlFor="album">Album:</label>
        <select
        id='album'
        value={albumId}
        onChange={e => setAlbumId(e.target.value)}
        >

        </select>
      </div>

      <div className='formElement' >
        <label htmlFor="title">title:</label>
        <input
        id='title'
        type='text'
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="description">description:</label>
        <input
        id='description'
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="url">url:</label>
        <input
        id='url'
        type='text'
        value={url}
        onChange={e => setUrl(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="previewImage">previewImage:</label>
        <input
        id='previewImage'
        type='text'
        value={previewImage}
        onChange={e => setPreviewImage(e.target.value)}
        />
      </div>

      <button className='formElement' type='submit'>Create Song</button>

    </form>
  );
}

export default CreateSongForm;
