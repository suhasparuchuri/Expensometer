import { Paper } from '@mui/material';
import React from 'react';
import { useStateValue } from '../../StateProvider';
import Transaction from '../Transaction/Transaction';
import './Transactions.css';

const Transactions = React.memo(({ transactions }) => {
  return (
    <>
      <Paper className='transactions'>
        <h2>List of All Transactions</h2>
        <div className='transactions__list'>
          {transactions.map((t) => (
            <Transaction key={t.id} {...t} />
          ))}
        </div>
      </Paper>
    </>
  );
});

export default Transactions;
