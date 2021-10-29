import { onAuthStateChanged } from '@firebase/auth';
import { Fab } from '@mui/material';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { auth, db } from './firebase';
import { useStateValue } from './StateProvider';
import AddIcon from '@mui/icons-material/Add';
import Form from './components/Form/Form';
import { collection, doc, onSnapshot, query, where } from '@firebase/firestore';

function App() {
  const [{ user }, dispatch] = useStateValue();

  // query for the transactions of current user.

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      dispatch({ type: 'SET_USER', payload: currUser });
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'transactions'),
      where('username', '==', `${user?.email}`)
    );

    const unsubscribe = async () => {
      await onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs.map((doc) => 'Hello World'));
      });
    };

    unsubscribe();
  }, );

  console.log(user);

  return (
    <div className='app'>
      <ToastContainer />
      {user ? (
        <div>
          <Header />
          <Form />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
