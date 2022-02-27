import './signUp.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import api from '../../api';


export default function SignUp({ handleLoginOrSignUp }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser() {
    await api.post("/register", { name, email, password }
    ).then(response => {
      console.log(response.status)
      if (response.status === 201) {
        handleLoginOrSignUp();
      }
    }).catch(err => {
      console.log(err.response)
    })
  }

  return (
    <div className="signup-container">
      <p className="signup-title">Create your account</p>
      <TextField
        className='textfield-style'
        id="name"
        value={name}
        label="Name"
        variant="outlined"
        size="small"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className='textfield-style'
        id="email"
        value={email}
        label="Email"
        type="email"
        variant="outlined"
        size="small"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className='textfield-style'
        id="password"
        value={password}
        label="Password"
        type="password"
        size="small"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="sign-in-btn" variant="contained" onClick={registerUser}>SIGN UP</Button>
    </div>
  )
}