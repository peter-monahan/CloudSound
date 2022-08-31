import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if(sessionUser) {
    return <Redirect to='/' />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      credential,
      password
    }

    let error = await dispatch(loginUser(payload));
    if(error) {
      setErrors(error.errors);
    }
    setPassword('');
  }

  return (
    <form onSubmit={onSubmit} className='loginForm' >
      { errors.length > 0 &&
      <ul className='errorBox'>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      }
      <div className='formElement' >
        <label htmlFor="credential">Credential:</label>
        <input
        id='credential'
        type='text'
        value={credential}
        onChange={e => setCredential(e.target.value)}
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
      <button className='formElement' type='submit'>login</button>
    </form>
  );
}

export default LoginForm;
