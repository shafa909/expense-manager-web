import './authPage.css'
import Login from '../../components/login/Login';
import SignUp from '../../components/signUp/SignUp';
import Link from '@mui/material/Link';
import { useState } from 'react';


export default function AuthPage() {

  const [loginOrSignUp, setLoginOrSignUp] = useState(true);

  const handleLoginOrSignUp = () => {
    setLoginOrSignUp(!loginOrSignUp);
  }

  return (
    <div className='main-container'>
      {
        loginOrSignUp ? <Login /> : <SignUp handleLoginOrSignUp={handleLoginOrSignUp} />
      }
      <p>
        <span style={{ fontSize: '14px' }}>{loginOrSignUp ? "Don't have an account?  " : "Already have an account?  "}</span>
        <Link href="#" underline="none" onClick={handleLoginOrSignUp} className='create-account-tag' style={{ fontSize: '14px' }}>
          {loginOrSignUp ? '  CREATE AN ACCOUNT' : '  SIGN IN HERE'}
        </Link>
      </p>
    </div>
  )
}