import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      id: 1,
      type: 'Income',
      category: 'Business',
      amount: 100000,
      date: new Date(),
    },
    {
      id: 2,
      type: 'Expense',
      category: 'Bills',
      amount: 35000,
      date: new Date(),
    },
    {
      id: 3,
      type: 'Income',
      category: 'Investments',
      amount: 53000,
      date: new Date(),
    },
    {
      id: 4,
      type: 'Expense',
      category: 'Food',
      amount: 20000,
      date: new Date(),
    },
    {
      id: 5,
      type: 'Income',
      category: 'Deposits',
      amount: 23000,
      date: new Date(),
    },
    {
      id: 6,
      type: 'Expense',
      category: 'Shopping',
      amount: 7000,
      date: new Date(),
    },
    {
      id: 7,
      type: 'Income',
      category: 'Lottery',
      amount: 1000000,
      date: new Date(),
    },
    {
      id: 8,
      type: 'Expense',
      category: 'Phone',
      amount: 5000,
      date: new Date(),
    },
    {
      id: 9,
      type: 'Income',
      category: 'Salary',
      amount: 86000,
      date: new Date(),
    },
    {
      id: 10,
      type: 'Expense',
      category: 'Entertainment',
      amount: 10000,
      date: new Date(),
    },
    {
      id: 11,
      type: 'Income',
      category: 'Rental Income',
      amount: 53000,
      date: new Date(),
    },
  ],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions = [action.payload, ...state.transactions];
    },
  },
});


export const { addTransaction } = globalSlice.actions

export default globalSlice.reducer