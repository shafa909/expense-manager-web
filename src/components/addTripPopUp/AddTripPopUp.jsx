import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';

import api from '../../api';
import './addTripPopUp.css'


export default function AddTripPopUp({ hidePopUp, getTripsData }) {
  const [tripName, setTripName] = useState('');
  const [tripDesc, setTripDesc] = useState('');

  async function createTrip() {
    let apiData = {
      'trip_name': tripName,
      'trip_desc': tripDesc
    }
    await api.post("/create-trip", apiData, {
      headers: {
        "x-access-token": localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status = 201) {
        console.log(response.data)
      }
      hidePopUp();
      getTripsData();
    }).catch(err => {
      console.log(err.response)
    })
  }

  return (
    <Alert className='add-trip-pop-up' onClose={hidePopUp}>
      <div className='alert-fields'>
        <TextField
          id="tripName"
          label="Trip Name"
          value={tripName}
          size="small"
          variant="standard"
          onChange={(e) => setTripName(e.target.value)}
        />
        <TextField
          style={{ marginTop: '20px' }}
          id="tripDesc"
          label="Trip Description"
          value={tripDesc}
          size="small"
          variant="standard"
          onChange={(e) => setTripDesc(e.target.value)}
        />
        <Button style={{ marginTop: '40px' }} variant="contained" onClick={createTrip}>Save Trip</Button>
      </div>
    </Alert>
  )
}