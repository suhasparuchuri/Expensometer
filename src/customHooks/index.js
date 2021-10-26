// filtering all the income from the random transactions.

import {
  expenseCategories,
  incomeCategories
} from '../constants';

export const useTransactions = (title, transactions) => {
  const transactionsPerType = transactions.filter((t) => t.type === title);

  const total = transactionsPerType.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = title === 'Income' ? incomeCategories : expenseCategories;

  transactionsPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { total, filteredCategories, chartData };
};

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export const getProperDate = (date) => {
  return `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
};
