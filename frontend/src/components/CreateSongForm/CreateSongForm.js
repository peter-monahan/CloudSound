import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './CreateSongForm.css';

const CreateSongForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const errors = [];

    if(title.length < 1 || username.length > 64) errors.push('Please provide a title with between 1-64 characters.');
    if(description.length > 255) errors.push('Description must be less than 255 characters.');
    if(!url) errors.push('URL is required');
    setValidationErrors(errors);
  }, [title, description, url])


  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const payload = {
      albumId,
      title,
      description,
      url,
      previewImage
    }


    let resErrors;
    if(!validationErrors.length) {
      resErrors = await dispatch(signupUser(payload));
      if(resErrors) {
        setValidationErrors(resErrors.errors);
      }
    }

  }

  return (
    <form onSubmit={onSubmit} className='signupForm' >
      { validationErrors.length > 0 && hasSubmitted &&
      <ul className='errorBox'>
        {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      }
      <div className='formElement' >
        <label htmlFor="email">Email:</label>
        <input
        id='email'
        type='text'
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="username">Username:</label>
        <input
        id='username'
        type='text'
        value={username}
        required
        onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="firstName">First Name:</label>
        <input
        id='firstName'
        type='text'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="lastName">Last Name:</label>
        <input
        id='lastName'
        type='text'
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="password">Password:</label>
        <input
        id='password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className='formElement' >
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
        id='confirmPassword'
        type='password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className='formElement' type='submit'>Signup</button>

    </form>
  );
}

export default CreateSongForm;
