import NumberFormat from 'react-number-format';
import { getProperDate } from '../customHooks';

const Transaction = ({ t }) => {
  return (
    <div>
      <h3>{t.type}</h3>
      <p>{t.category}</p>
      <span>
        <NumberFormat
          value={t.amount}
          className='foo'
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rs. '}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </span>
      <p>{getProperDate(t.date)}</p>
    </div>
  );
};

export default Transaction;
