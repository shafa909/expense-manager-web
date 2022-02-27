import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import api from '../../api';
import Navbar from "../../components/navbar/Navbar";
import AddMembersPopUp from "../../components/addMembersPopUp/AddMembersPopUp"
import AddExpensePopUp from '../../components/addExpensePopUp/AddExpensePopUp';
import ExpenseGrid from '../../components/expenseGrids/expenseGrid';
import ExpenseGridForPayment from '../../components/expenseGrids/expenseGridForPay';
import './tripPage.css';

export default function TripPage() {


  const navigate = useNavigate();
  const id = useParams()
  const colorList = ['#d3eed9', '#cad2e3', '#ceebfc', '#fce0bf', '#fca29d', '#bbd0de']
  const [showAddMembPopup, setShowAddMembPopup] = useState(false);
  const [showAddExpensePopup, setShowAddExpensePopup] = useState(false);
  const [tripMembers, settripMembers] = useState([]);
  const [tripInfo, setTripInfo] = useState({});

  const hideAddMembPopUp = () => setShowAddMembPopup(false);
  const showAddMembPopUp = () => setShowAddMembPopup(true);
  const hideAddExpensePopUp = () => setShowAddExpensePopup(false);
  const showAddExpensePopUp = () => setShowAddExpensePopup(true);

  async function getTripDetails() {
    console.log('ssss')
    await api.get("/get-trip-details", {
      params: {
        trip_id: id.tripid,
      },
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status === 201) {
        console.log(response.data)
      }
      setTripInfo(response.data);
      updateTripMemberName(response.data);
    }).catch(err => {
      console.log('errorsssss', err)
    })
  }


  function updateTripMemberName(data) {
    let userData = []
    userData.push('you');

    data.trip.member_details.map((user) => {
      if (user._id !== data.trip.current_user_id)
        userData.push(user.name)
    })
    settripMembers(userData)
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getTripDetails();
    } else {
      navigate("/")
    }
  }, []);

  return (
    <div className='main-container'>
      <Navbar tripPage />
      <div className="top-container">
        {showAddMembPopup ? <AddMembersPopUp updateTripPage={getTripDetails} tripId={id.tripid} hidePopUp={hideAddMembPopUp} /> : null}
        {showAddExpensePopup ? <AddExpensePopUp updateTripPage={getTripDetails} tripInfo={tripInfo.trip} hidePopUp={hideAddExpensePopUp} /> : null}
        <Button className='add-expense-button' variant="contained" size="small" onClick={showAddExpensePopUp}  >
          Add Expense
        </Button>
        <Button className='add-members-button' variant="contained" size="small" onClick={showAddMembPopUp}  >
          Add Members
        </Button>
        <h4 className="trip-info">
          {tripInfo.trip ? tripInfo.trip.name + ', ' + tripInfo.trip.desc + ', created by: ' + tripInfo.trip.trip_creater_name : ''}
        </h4>
        <h3 className="members-heading">
          Trip Members
        </h3>
        <div className="trip-members-container">
          {
            tripMembers.length ?
              tripMembers.map(function (object, i) {
                const random = Math.floor(Math.random() * colorList.length);
                return (
                  <div className='trip-member-div' key={i} style={{ backgroundColor: colorList[random] }}>
                    <h3 className='trip-member-text'>{object}</h3>
                  </div>
                )
              })
              :
              <div className='trip-member-div' style={{ backgroundColor: colorList[1] }}>
                <h3 className='trip-member-text'>{'you'}</h3>
              </div>
          }
        </div>
        <hr style={{ margin: '30px' }}></hr>
        <h3 className="expense-heading">
          Expense List (You Spent)
        </h3>
        <div className="expense-list-container">
          {
            tripInfo.in ? Object.entries(tripInfo.in).map(([key, value]) => {
              const random = Math.floor(Math.random() * colorList.length);
              return (
                <ExpenseGrid bgColor={colorList[random]} expenseList={value} key={key} />
              )
            }) : ''
          }
        </div>
        <hr style={{ margin: '30px' }}></hr>
        <h3 className="expense-heading">
          Expense List (To Pay)
        </h3>
        <div className="expense-list-container">
          {
            tripInfo.out ? Object.entries(tripInfo.out).map(([key, value]) => {
              const random = Math.floor(Math.random() * colorList.length);
              return (
                <ExpenseGridForPayment updateTripPage={getTripDetails} bgColor={colorList[random]} expense={value} key={key} />
              )
            }) : ''
          }
        </div>
      </div>
    </div>
  )
}