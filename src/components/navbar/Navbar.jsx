import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../../userContext/UserContext';

import './navbar.css';

export default function Navbar({ tripPage }) {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext)

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className='navbar-container'>
      <h3 className='hello-greets'>
        {currentUser.user_name ? 'Hello ' + currentUser.user_name : ''}
      </h3>
      {
        tripPage ? <Link to="/dashboard" style={{ fontSize: '70px', color: '#1a76d2' }}><b><ArrowBackIcon /></b></Link> : ''
      }
      <Button className='logout-button' variant="contained" size="small" onClick={logout} endIcon={<SendIcon />}>
        Logout
      </Button>
    </div>
  )
}