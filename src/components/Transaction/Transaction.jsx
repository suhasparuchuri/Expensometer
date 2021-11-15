import { deleteDoc, doc } from '@firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Tooltip } from '@mui/material';
import NumberFormat from 'react-number-format';
import { db } from '../../firebase';
import { getIconSrc } from '../../utils/getIconSrc';

function Transaction({ id, amount, category, type, date, _createdAt }) {
  const amountColor = type === 'Income' ? 'green' : 'red';
  const iconSrc = getIconSrc(category, type);

  const deleteTransaction = async () => {
    await deleteDoc(doc(db, 'transactions', id));
    console.log('Delted');
  };

  return (
    <Paper className='transaction'>
      <div className='transaction__icon' style={{backgroundColor:`${type === "Income" && "#8ced76"}`}}>
        <img src={iconSrc} alt='' />
      </div>
      <div className='transaction__left'>
        <p>{category}</p>
        <span>{date}</span>
      </div>
      <div className='transaction__middle'>
        <NumberFormat
          style={{ color: amountColor }}
          value={amount}
          className='foo'
          displayType={'text'}
          thousandSeparator={true}
          prefix={type === 'Income' ? '+Rs.' : '-Rs.'}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </div>
      <div className='transaction__right'>
        <Tooltip title='Delete'>
          <IconButton onClick={deleteTransaction}>
            <DeleteIcon color='primary' />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
}

export default Transaction;
