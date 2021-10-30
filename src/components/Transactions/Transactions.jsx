import { Paper } from '@mui/material';
import { useStateValue } from '../../StateProvider';
import Transaction from '../Transaction/Transaction';
import './Transactions.css';

function Transactions() {
  const [{ transactions }] = useStateValue();

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
}

export default Transactions;
