import { useState } from 'react';
import { Paper } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import './Login.css';

function Login() {
  // local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // button click handlers
  const login = async () => {
    if (email === '' || password === '') {
      toast.error('Email/Password cannot be empty', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => alert(err.message));
  };

  const createUser = async () => {
    if (email === '' || password === '') {
      toast.error('Email/Password cannot be empty', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className='login'>
      {/* left */}
      <div className='login__left'>
        <p>Manage Your Transactions.</p>
        <p>Store All your Trasnactions at One place.</p>
        <p>Analyze your Transactions.</p>
      </div>

      {/* right */}
      <Paper elevation={16} className='login__right'>
        <form>
          <h1>Login/SignUp</h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login__input'
            type='text'
            placeholder='Email...'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login__input'
            type='password'
            placeholder='Password...'
          />
          <button onClick={login} type='button' className='login__btn'>
            Login
          </button>
          <div className='login__alert'>
            <strong>Note : </strong>
            <p>
              If you are a new user please enter your prefered email and
              password and click on the Create Account button.Or else if you are
              already having an account login by providing your credentials
            </p>
          </div>

          <button
            onClick={createUser}
            type='button'
            className='login__signupbtn'
          >
            Create Account
          </button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
