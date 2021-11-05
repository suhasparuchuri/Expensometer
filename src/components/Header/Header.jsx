import { signOut } from '@firebase/auth';
import PersonIcon from '@mui/icons-material/Person';
import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { auth } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Header.css';

function Header() {

  const [state,dispatch] = useStateValue()
  

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
      {/* <div className='header__balance'>
        <p>
          Balance :
          
        </p>
      </div> */}
      <div className='header__userGreet'>
        <Tooltip title="USER DETAILS">
          <IconButton onClick={()=>{dispatch({type:"SET_MODAL_STATE", payload:true})}}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className='header__logoutbtn'>
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </Paper>
  );
}

export default Header;
