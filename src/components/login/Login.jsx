import './login.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/UserContext';


export default function Login({ view }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useContext(UserContext)

  async function LoginUser() {
    await api.post("/login", { email, password }
    ).then(response => {
      console.log(response)
      if (response['data'].user) {
        localStorage.setItem('token', response['data'].user)
        console.log('Login success');
        setCurrentUser({ user_id: response['data'].user_id, user_name: response['data'].user_name, })
        navigate("/dashboard");
      }
    }).catch(err => {
      console.log(err.response)
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <div className="login-container">
      <p className="login-title">Sign in to your account</p>
      <TextField
        className='textfield-style'
        id="username"
        value={email}
        label="Email"
        variant="outlined"
        size="small"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className='textfield-style'
        id="password-input"
        value={password}
        label="Password"
        type="password"
        size="small"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="sign-in-btn" variant="contained" onClick={LoginUser}>SIGN IN</Button>
    </div>
  )
}