import { useSelector } from 'react-redux';
import Charts from './components/Charts';
import Main from './components/Main';
import {
  useTransactions,
  getExpenseDataset,
  getIncomeDataset,
} from './customHooks';
import './index.css';

const App = () => {
  // gettting all the trasnactions from the global state
  const allTransactions = useSelector((state) => state.global.transactions);

  const hook1 = useTransactions('Income', allTransactions);
  const hook2 = useTransactions('Expense', allTransactions);

  // getting all data required for charts.

  // console.log({
  //   incomeDataset,
  //   totalIncome,,
  //   totalExpenditure,
  //   expenseDataset,
  // });

  // console.log(allTransactions);

  return (
    <div className='app'>
      {/* left side income chart */}
      <Charts title='Income' total={hook1.total} chartData={hook1.chartData} />

      {/* middle form for adding transactions */}
      <Main className='app__main' balance={hook1.total - hook2.total}/>

      {/* right side expense chart */}
      <Charts
        title='Expense'
        total={hook2.total}
        chartData={hook2.chartData}
      />
    </div>
  );
};

export default App;
