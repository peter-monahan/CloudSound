import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, signupUser } from '../../store/session';
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


  const demoUser = async (e) => {
    e.preventDefault();


    let payload;
    payload = {
      credential: 'demo-user',
      password: 'password'
    }

    let error = await dispatch(loginUser(payload));
    if(error) {
      console.error(error);
      payload = {
        email: 'demouser@cloudsounds.com',
        username: 'demo-user',
        firstName: 'demo',
        lastName: 'user',
        password: 'password'
      }

      const resErrors = await dispatch(signupUser(payload));
      if(resErrors) console.error(resErrors);
    }
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
    <form onSubmit={onSubmit} className='basic-form login-form' >
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
        required
        />
      </div>
      <div className='formElement' >
        <label htmlFor="password">Password:</label>
        <input
        id='password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        />
      </div>
      <button className='formElement' type='submit'>login</button>
      <button className='formElement' onClick={demoUser}>Login as demo user</button>
    </form>
  );
}

export default LoginForm;
