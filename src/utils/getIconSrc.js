import { expenseIcons, incomeIcons } from './transactionIcons';

export const getIconSrc = (category, type) => {
  if (type === 'Income') {
    const icons = incomeIcons;
    if (category === 'Business') {
      return icons.Business;
    } else if (category === 'Investments') {
      return icons.Investments;
    } else if (category === 'ExtraIncome') {
      return icons.ExtraIncome;
    } else if (category === 'Deposits') {
      return icons.Deposits;
    } else if (category === 'Lottery') {
      return icons.Lottery;
    } else if (category === 'Gifts') {
      return icons.Gifts;
    } else if (category === 'Salary') {
      return icons.Salary;
    } else if (category === 'Savings') {
      return icons.Savings;
    } else {
      return icons.RentalIncome;
    }
  } else {
    const icons = expenseIcons;
    if (category === 'Bills') {
      return icons.Bills;
    } else if (category === 'Car') {
      return icons.Car;
    } else if (category === 'Clothes') {
      return icons.Clothes;
    } else if (category === 'Travel') {
      return icons.Travel;
    } else if (category === 'Food') {
      return icons.Food;
    } else if (category === 'Shopping') {
      return icons.Shopping;
    } else if (category === 'House') {
      return icons.House;
    } else if (category === 'Entertainment') {
      return icons.Entertainment;
    } else if (category === 'Phone') {
      return icons.Phone;
    } else if (category === 'Pets') {
      return icons.Pets;
    } else {
      return icons.Other;
    }
  }
};
