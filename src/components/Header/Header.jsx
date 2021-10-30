import { signOut } from '@firebase/auth';
import { Button, Paper } from '@mui/material';
import NumberFormat from 'react-number-format';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { getBalance } from '../../utils/getBalance';
import './Header.css';

function Header() {
  const [{ user, transactions }] = useStateValue();

  const balance = getBalance(transactions);

  const logoutUser = () => {
    signOut(auth);
  };

  return (
    <Paper className='header'>
      <div className='header__logo'>
        <h1>Expensometer</h1>
        <p>
          Powered by <u>Speechly</u>
        </p>
      </div>
      <div className='header__balance'>
        <p>
          Balance :
          <NumberFormat
            value={balance}
            className='foo'
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rs.'}
            renderText={(value, props) => <div {...props}>{value}</div>}
          />
        </p>
      </div>
      <div className='header__userGreet'>
        Hello, {user.email} ✋✋
      </div>
      <div className='header__logoutbtn'>
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </Paper>
  );
}

export default Header;
