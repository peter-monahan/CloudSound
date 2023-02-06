import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory} from 'react-router-dom';
import { createAlbum, resetAlbum } from '../../store/display';
import { getUserAlbums } from '../../store/albums';


import './CreateAlbumForm.css';

const CreateAlbumForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const newAlbum = useSelector(state => state.display.album);



  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [previewPreview, setPreviewPreview] = useState('')

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validImage, setValidImage]= useState(true);
  const [loadedImg, setLoadedImg] = useState(true);
  useEffect(() => {
    return () => dispatch(resetAlbum());
  }, [])

  useEffect(() => {
    const errors = [];

    if(title.length < 1 || title.length > 64) errors.push('Please provide a title with between 1-64 characters.');
    if(description.length > 255) errors.push('Description must be less than 255 characters.');
    if(!validImage) errors.push('Album Image must be valid image url or blank.');
    setValidationErrors(errors);
  }, [title, description,validImage])


  useEffect(() => {
    setLoadedImg(false)
    let timeout = setTimeout(() => {setPreviewPreview(previewImage); setLoadedImg(true)}, 100);

    return () => {
      clearTimeout(timeout);
    }
  }, [previewImage])

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const payload = {
        title,
        description: description.length ? description : undefined,
        previewImage
      }



    let album;
    if(!validationErrors.length) {
      album = await dispatch(createAlbum(payload));
      if(album.errors) {
        setValidationErrors(album.errors);
      } else {
        history.push(`/albums/${album.id}`)
      }
    }

  }

  return (
    <form onSubmit={onSubmit} className='basic-form create-album-form' >
      { validationErrors.length > 0 && hasSubmitted &&
      <div className='errorBox'>
        {validationErrors.map((err, i) => <div className='err-message' key={i}>{err}</div>)}
      </div>
      }

      <div className='formElement' >
        <label htmlFor="title">Album Title:</label>
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


      <div className='formElement' >
        <label htmlFor="previewImage">Album Image</label>
        <input
        id='previewImage'
        type='text'
        value={previewImage}
        onChange={e => {setPreviewImage(e.target.value); setValidImage(true)}}
        />
        { previewPreview !== '' && <img onError={(e) => setValidImage(false)} src={previewPreview} className='form-prev-image'/>}
      </div>

      <div className='form-bottom-buttons'>
        <Link to={`/users/${sessionUser.id}`}>
          <button className='formElement'>Cancel</button>
        </Link>
        <button disabled={!loadedImg} className='formElement' type='submit'>Create Album</button>
      </div>

    </form>
  );
}

export default CreateAlbumForm;
