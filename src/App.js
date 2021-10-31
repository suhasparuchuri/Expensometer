import { onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NoDataImg from './assets/3973481-removebg.png';
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
      query(collection(db, `transactions`), orderBy('_createdAt', 'desc')),
      (snapshot) => {
        if (user) {
          dispatch({
            type: 'SET_TRANSACTIONS',
            payload: snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((t) => t.username === user.email),
          });
        }
      }
    );

    return unsubscribe
  }, [dispatch, user]);

  console.log({ user, transactions });

  return (
    <div className='app'>
      <ToastContainer />
      {user ? (
        <div className='app__mainContent'>
          <Header />
          <Form />
          {transactions?.length >= 1 ? (
            <div className='mainContent__data'>
              <div className='data__left'>
                <Transactions transactions={transactions} />
              </div>
              <div className='data__right'>
                <Chart title='Income' />
                <Chart title='Expense' />
              </div>
            </div>
          ) : (
            <img className='nodata__img' src={NoDataImg} alt='No Data Found' />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
