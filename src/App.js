/* eslint-disable import/no-extraneous-dependencies */
import { onAuthStateChanged } from '@firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
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
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from '@speechly/react-ui';
import { Modal, Tooltip } from '@mui/material';
import { getBalance } from './utils/getBalance';
import NumberFormat from 'react-number-format';
import AccountDetailsSvg from './assets/undraw_profile_re_4a55.svg';

function App() {
  const [{ user, transactions, windowWidth, openModal }, dispatch] =
    useStateValue();
  const [username, setUsername] = useState('');

  const balance = getBalance(transactions);
  // query for the transactions of current user.

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      dispatch({ type: 'SET_USER', payload: currUser });
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch({ type: 'SET_WIDTH', payload: window.innerWidth });
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'transactions'), orderBy('_createdAt', 'desc')),
      (snapshot) => {
        dispatch({
          type: 'SET_TRANSACTIONS',
          payload: snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((t) => t.username === user?.email),
        });
      }
    );

    return unsubscribe;
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setUsername(doc.data().username);
      });
    }
  }, [user]);

  console.log({ user, transactions, windowWidth });

  const handleModalClose = () => {
    dispatch({ type: 'SET_MODAL_STATE', payload: false });
  };

  return (
    <div className='app'>
      <ToastContainer />
      {user ? (
        <div className='app__mainContent'>
          <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <div className='modal__container'>
              <span
                className="modal__close"
                onClick={() => {
                  dispatch({ type: 'SET_MODAL_STATE', payload: false });
                }}
              >
                &times;
              </span>

              <img
                style={{ width: '100%', objectFit: 'contain' }}
                src={AccountDetailsSvg}
                alt=''
              />
              <div className='modal__details'>
                <div className='modal_detail'>
                  <p className='detail-header'>Email</p>
                  <p>{user.email}</p>
                </div>
                <div className='modal_detail'>
                  <p className='detail-header'>Username</p>
                  <p>{username}</p>
                </div>
                <div className='modal_detail'>
                  <p className='detail-header'>User since</p>
                  <p>{user.metadata.creationTime.split(" ").slice(0,4).join(" ")}</p>
                </div>
                <div className='modal_detail'>
                  <p className='detail-header'>Balance</p>
                  <p>
                    <NumberFormat
                      value={balance}
                      className='foo'
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rs.'}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <div className='mic__container'>
            <PushToTalkButtonContainer>
              <PushToTalkButton placement='top' size='50px' />
            </PushToTalkButtonContainer>
          </div>
          <Header />
          <Form />
          {transactions?.length >= 1 ? (
            <div className='mainContent__data'>
              <div className='data__left'>
                <Transactions transactions={transactions} />
              </div>
              <div className='data__right'>
                {transactions.filter((t) => t.type === 'Income').length > 0 && (
                  <Chart title='Income' />
                )}

                {transactions.filter((t) => t.type === 'Expense').length >
                  0 && <Chart title='Expense' />}
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
