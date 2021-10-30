export const getBalance = (transactions) =>
  transactions?.reduce(
    (acc, currVal) =>
      currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount,
    0
  );
