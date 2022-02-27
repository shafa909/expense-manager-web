import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './dashboard.css';
import api from '../../api';
import Navbar from "../../components/navbar/Navbar";
import AddTripPopUp from "../../components/addTripPopUp/AddTripPopUp"
import TripGrid from "../../components/tripGrids/TripGrid";


export default function Dashboard() {

  const navigate = useNavigate();
  const colorList = ['#d3eed9', '#cad2e3', '#ceebfc', '#fce0bf', '#fca29d', '#bbd0de']
  const [tripList, setTripList] = useState([]);
  const [showAddTripPopup, setShowAddTripPopup] = useState(false);

  async function getTripsData() {
    await api.get("/get-trip-lists", {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(response => {
      setTripList(response.data.trips);
    }).catch(err => {
      console.log(err.response)
    })
  }

  const hideAddTripPopUp = () => {
    setShowAddTripPopup(false);

  }

  const showAddTripPopUp = () => {
    setShowAddTripPopup(true);
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getTripsData()
    } else {
      navigate("/")
    }
  }, []);

  return (
    <div className='main-container'>
      <Navbar />
      <div className="trip-container">
        {showAddTripPopup ? <AddTripPopUp getTripsData={getTripsData} hidePopUp={hideAddTripPopUp} /> : null}
        <Button className='add-trip-button' variant="contained" size="small" onClick={showAddTripPopUp} >
          Create  Trip
        </Button>
        <h1 className="tirp-heading">
          Trip Lists
        </h1>
        <div className="trip-grid-group">
          {tripList.length ?
            tripList.map(function (object, i) {
              const random = Math.floor(Math.random() * colorList.length);
              return <TripGrid tripData={object} bgColor={colorList[random]} key={i} />;
            })
            : <h3 className="not-found-heading"> No Trip Found</h3>
          }
        </div>
      </div>
    </div>
  )
}