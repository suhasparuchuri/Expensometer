import { addDoc, collection, Timestamp } from '@firebase/firestore';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  incomeCategories,
  expenseCategories,
} from '../../constants/categories';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Form.css';

function Form() {
  // getting current user
  const [{ user }] = useStateValue();

  // whole state
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const categories = type === 'Income' ? incomeCategories : expenseCategories;

  // { amount: 500, category: 'Salary', type: 'Income', date: '2020-11-16', id: '44c68123-5b86-4cc8-b915-bb9e16cebe6a' }
  const addTransaction = async (e) => {
    e.preventDefault();
    const newTransaction = {
      amount: parseInt(amount),
      category,
      type,
      date,
      username: user.email,
      _createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, 'transactions'), newTransaction)
      .then(() => {
        toast.success('Transaction succesfully added', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setAmount(0);
    setCategory('');
    setDate(null);
  };

  return (
    <Paper className='mainForm__container'>
      <form className='mainForm'>
        <div className='mainForm__input'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={'Income'}>Income</MenuItem>

              <MenuItem value={'Expense'}>Expense</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ flex: 1 }} className='mainForm__input'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='mainForm__input'>
          <TextField
            type='number'
            placeholder='Amount in Rs.'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='mainForm__input'>
          <input
            type='datetime-local'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='mainForm__submitBtn'
          variant='contained'
          onClick={addTransaction}
        >
          Add
        </button>
      </form>
    </Paper>
  );
}

export default Form;
