import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useState, useEffect } from 'react';
import Select from 'react-select';

import api from '../../api';
import './addExpensePopUp.css'


export default function AddExpensePopUp({ updateTripPage, tripInfo, hidePopUp }) {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  async function addExpense() {
    let selectedMembId = [];
    selectedUser.map((user) => {
      selectedMembId.push(user.value)
    })
    let apiData = {
      "tripId": tripInfo._id,
      "name": expenseName,
      "amount": expenseAmount,
      "memberIds": selectedMembId
    }
    await api.post("/add-expense", apiData, {
      headers: {
        "x-access-token": localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response.data)
      hidePopUp();
      updateTripPage()
    }).catch(err => {
      console.log(err.response)
    })
  }

  function handleChange(newValue) {
    setSelectedUser(newValue);
  };

  function handleInputChange(inputValue) {
    console.log(inputValue);
  };

  useEffect(() => {
    let userData = []
    tripInfo.member_details.map(user => {
      if (tripInfo.current_user_id != user._id) {
        userData.push({
          value: user._id,
          label: user.name
        })
      }
    });
    setUserList(userData)
  }, []);

  return (
    <Alert className='add-expense-pop-up' onClose={hidePopUp}>
      <div className='alert-fields'>
        <TextField
          id="ExpenseName"
          label="Expense Name"
          value={expenseName}
          size="small"
          variant="standard"
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <TextField
          style={{ marginTop: '20px' }}
          id="tripDesc"
          label="Expense Amount"
          value={expenseAmount}
          size="small"
          variant="standard"
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <Select
          className="basic-single expense-user-select"
          classNamePrefix="select"
          isMulti
          placeholder="Search Members"
          defaultValue={''}
          isClearable={true}
          isSearchable={true}
          name="user"
          options={userList}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
        <Button style={{ marginTop: '40px' }} variant="contained" onClick={addExpense}>Save Expense</Button>
      </div>
    </Alert>
  )
}