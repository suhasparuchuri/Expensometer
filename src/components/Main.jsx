import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { expenseCategories, incomeCategories } from '../constants';
import { addTransaction } from '../Store/slice';
import './Main.css';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import Transaction from './Transaction';

const Main = ({ balance }) => {
  // data to get from the user
  // 1. type
  // 2. category
  // 3. amount
  // 4. data

  const [type, setType] = useState('Income');
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(categories[0]);

  // using dispatch hook for getting acces to the reducers.
  const dispatch = useDispatch();
  const allTransactions = useSelector((state) => state.global.transactions);

  useEffect(() => {
    if (type === 'Income') {
      setCategories(incomeCategories.map((iC) => iC.type));
    } else {
      setCategories(expenseCategories.map((eC) => eC.type));
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      type,
      category,
      amount: parseInt(amount),
      date,
    };
    dispatch(addTransaction(newTransaction));
    console.log(newTransaction);
  };

  return (
    <Paper elevation={6} className='main'>
      {/* Main form here adding/deleting transactions will be done */}

      <div className='main__header'>
        <div className='main__heading'>
          <h2>Expensometer</h2>
          <p>Powered by Speechly</p>
        </div>

        <div className='main__balance'>
          <p>
            <h4>Total Balance</h4>
            <NumberFormat
              value={balance}
              className='foo'
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rs. '}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
        </div>
      </div>

      <div className='main__exSpeech'>
        <h4>Try Saying : </h4>
        <p>Add expense for $50 in the category of travel for next thursday.</p>
      </div>

      <Divider />

      {/* Form for adding */}

      <form onSubmit={handleSubmit} className='main__form'>
        <div className='main__formRow'>
          <div className='main__formInput'>
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
          <div className='main__formInput full__flex'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Category'
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='main__formRow'>
          <div className='main__formInput'>
            <TextField
              value={amount}
              type='number'
              onChange={(e) => setAmount(e.target.value)}
              id='outlined-basic'
              label='Amount in Rs'
              variant='outlined'
            />
          </div>
          <div className='main__formInput full__flex main__formDate'>
            <p style={{ paddingRight: '5px' }}>Select a Date :</p>
            <DatePicker onChange={setDate} value={date} />
          </div>
          <div className='main__formBtn'>
            <Button type='submit' variant='contained'>
              Add
            </Button>
          </div>
        </div>
      </form>

      {/* List of transactions */}

      <h2 className='main__listtitle'>List of all Transactions</h2>

      <div className='main__listTransactions'>
        {allTransactions.map((t) => (
          <Transaction t={t} key={t.id} />
        ))}
      </div>
    </Paper>
  );
};

export default Main;
