import { Paper } from '@mui/material';
import { Doughnut, Pie } from 'react-chartjs-2';
import NumberFormat from 'react-number-format';
import './Charts.css';

const Charts = ({ title, total, chartData }) => {
  return (
    <Paper elevation={4} className='charts'>
      <h2 className='charts__title'>{title}</h2>
      <h5 className='charts__total'>
        <NumberFormat
          value={total}
          className='foo'
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rs. '}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </h5>
      <Doughnut
        data={chartData}
        className='charts__chart'
      />
    </Paper>
  );
};

export default Charts;
