import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signupUser, loginUser } from '../../store/session';
import './SignupForm.css';

const SignupForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const validEmail = (email) => {
    const split = email.split('@');

    if(split.length > 1 && split[0].length && split[1].length) {
      const end = split[1].split('.');
      if(end.length > 1 && end[0].length && end[1].length) {
        return true;
      }
    }
    return false
  }

  useEffect(() => {
    const errors = [];
    if(!validEmail(email)) errors.push('Please provide a valid email');
    if(username.length < 4 || username.length > 30) errors.push('Please provide a username with between 4-30 characters.');
    if(password.length < 6) errors.push('Password must be 6 characters or more.');
    if(password !== confirmPassword) errors.push('Confirm Password field must match password field');
    setValidationErrors(errors);
  }, [username, email, password, confirmPassword])

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

    setHasSubmitted(true);

    const payload = {
      email,
      username,
      firstName: firstName.length ? firstName : undefined,
      lastName: lastName.length ? lastName : undefined,
      password
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
      <button className='formElement' onClick={demoUser}>Login as demo user</button>

    </form>
  );
}

export default SignupForm;
