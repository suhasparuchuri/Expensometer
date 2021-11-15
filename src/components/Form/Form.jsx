/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-extraneous-dependencies
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  expenseCategories,
  incomeCategories,
} from '../../constants/categories';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Form.css';
import { useSpeechContext } from '@speechly/react-client';

function Form() {
  // getting current user
  const [{ user }] = useStateValue();

  const transactionBtnRef = useRef(null);

  // whole state
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState("");
  const categories = type === 'Income' ? incomeCategories : expenseCategories;

  // loading state of button
  const [loading, setLoading] = useState(false);

  const { segment } = useSpeechContext();

  const addTransaction = async (e) => {
    e.preventDefault();
    console.log(typeof date);

    const newTransaction = {
      // eslint-disable-next-line radix
      amount: parseInt(amount),
      category,
      type,
      date,
      username: user.email,
      _createdAt: Timestamp.now(),
    };

    setAmount('');
    setCategory('');
    setDate("");

    setLoading(true);
    const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
    setLoading(false);
    console.log('Document written with ID: ', docRef.id);
  };

  // logic for voice input actions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setType('Expense');
      } else if (segment.intent.intent === 'add_income') {
        setType('Income');
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'create_transaction'
      ) {
        return;
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'cancel_transaction'
      ) {
        setAmount('');
        setCategory('');
        setDate(null);
        return;
      }

      segment.entities.forEach((e) => {
        switch (e.type) {
          case 'amount':
            console.log(e.value);
            setAmount(e.value);
            break;
          case 'date':
            console.log(e.value);

            setDate(e.value);
            break;
          default:
          case 'category':
            const currCategory = `${e.value[0]}${e.value
              .substr(1)
              .toLowerCase()}`;
            console.log(currCategory);

            setCategory(currCategory);
            break;
        }
      });
    }
  }, [segment]);

  return (
    <Paper className='mainForm__container'>
      {segment ? (
        <p title='Transcript' className='speechly_transcript'>
          <span>Transcipt of the Voice Input 👉👉 : </span>
          {segment.words.map((w) => w.value).join(' ')}
        </p>
      ) : (
        <p title='Transcript' className='speechly_transcript'>
          <span>Try Saying 👉👉 : </span>
          Add income in category business of 500 ruppes for next tuesday.
        </p>
      )}
      <form onSubmit={addTransaction} className='mainForm'>
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
              <MenuItem value='Income'>Income</MenuItem>

              <MenuItem value='Expense'>Expense</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ width: '300px' }} className='mainForm__input'>
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
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type='submit'
            className={`mainForm__submitBtn ${loading && 'btn-loading'}`}
            variant='contained'
          >
            {loading ? 'Adding' : 'Add'}
          </button>
        </div>
      </form>
    </Paper>
  );
}

export default Form;
