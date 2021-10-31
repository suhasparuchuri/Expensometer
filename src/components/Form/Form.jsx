import { addDoc, collection, Timestamp } from '@firebase/firestore';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  expenseCategories, incomeCategories
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
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const categories = type === 'Income' ? incomeCategories : expenseCategories;

  // { amount: 500, category: 'Salary', type: 'Income', date: '2020-11-16', id: '44c68123-5b86-4cc8-b915-bb9e16cebe6a' }
  const addTransaction = async (e) => {
    e.preventDefault();

    if (category === '') {
      toast.error('Category cannot be empty.');
      return;
    }

    if (!(amount > 0)) {
      toast.error('Amount cannot be Rs. 0.');
      return;
    }

    if (date === null) {
      toast.error('Please consider adding date.');
      return;
    }

    const newTransaction = {
      amount: parseInt(amount),
      category,
      type,
      date,
      username: user.email,
      _createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
    console.log('Document written with ID: ', docRef.id);


    setAmount("")
    setCategory("")
  };

  return (
    <Paper className='mainForm__container'>
      <form className='mainForm'>
        <div className='mainForm__input'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Type</InputLabel>
            <Select
              required
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
              required
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
            required
            type='number'
            placeholder='Amount in Rs.'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='mainForm__input'>
          <input
            required
            type='date'
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
