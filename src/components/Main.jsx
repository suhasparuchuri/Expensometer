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
} from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { expenseCategories, incomeCategories } from '../constants';
import './Main.css';

const Main = () => {
  // data to get from the user
  // 1. type
  // 2. category
  // 3. amount
  // 4. data

  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (type === 'Income') {
      setCategories(incomeCategories.map((iC) => iC.type));
    } else {
      setCategories(expenseCategories.map((eC) => eC.type));
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ type, category, amount, date });
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
            Total Balance : <span>$50</span>
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='main__formRow'>
          <div className='main__formInput'>
            <FormControl>
              <InputLabel htmlFor='outlined-adornment-amount'>
                Amount
              </InputLabel>
              <OutlinedInput
                type="number"
                id='outlined-adornment-amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
                label='Amount'
              />
            </FormControl>
          </div>
          <div className='main__formInput'>
            <DatePicker onChange={setDate} value={date} />{' '}
          </div>
          <div className='main__formBtn'>
            <Button type='submit' variant='contained'>
              Add
            </Button>
          </div>
        </div>
      </form>

      {/* List of transactions */}
    </Paper>
  );
};

export default Main;
