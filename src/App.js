import { onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Chart from './components/Chart/Chart';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Transactions from './components/Transactions/Transactions';
import { auth, db } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user, transactions }, dispatch] = useStateValue();

  // query for the transactions of current user.

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      dispatch({ type: 'SET_USER', payload: currUser });
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'transactions'), orderBy('_createdAt', 'desc')),
      (snapshot) => {
        dispatch({
          type: 'SET_TRANSACTIONS',
          payload: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        });
      }
    );

    return unsubscribe;
  }, [dispatch]);

  console.log({ user, transactions });

  return (
    <div className='app'>
      <ToastContainer />
      {user ? (
        <div className='app__mainContent'>
          <Header />
          <Form />
          {transactions ? (
            <div className='mainContent__data'>
              <div className='data__left'>
                <Transactions />
              </div>
              <div className='data__right'>
                <Chart title='Income' />
                <Chart title='Expense' />
              </div>
            </div>
          ) : (
            <h3>No Transactions</h3>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
