import { Paper } from '@mui/material';
import React from 'react';
import { useStateValue } from '../../StateProvider';
import Transaction from '../Transaction/Transaction';
import './Transactions.css';
import PropTypes from 'prop-types';

const Transactions = ({ transactions }) => {
  return (
    
      <Paper className='transactions'>
        <h2>List of All Transactions</h2>
        <div className='transactions__list'>
          {transactions.map((t) => (
            <Transaction key={t.id} {...t} />
          ))}
        </div>
      </Paper>
    
  );
}

Transactions.propTypes = {
  transactions: PropTypes.array,
};

export default Transactions;
