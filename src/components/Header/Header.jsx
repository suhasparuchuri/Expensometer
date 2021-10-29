import { signOut } from '@firebase/auth';
import { Button, Paper } from '@mui/material';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Header.css';

function Header() {
  const [{ user }] = useStateValue();

  const logoutUser = () => {
    signOut(auth);
  };

  return (
    <Paper className='header'>
      <div className='header__logo'>
        <h1>Expensometer</h1>
        <p>Powered by <u>Speechly</u></p>
      </div>
      <div className='header__balance'>
        <strong>Balance : </strong>Rs.500
      </div>
      <div className='header__userGreet'>Hello, {user.email.split('@')[0]} ✋✋</div>
      <div className='header__logoutbtn'>
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </Paper>
  );
}

export default Header;
