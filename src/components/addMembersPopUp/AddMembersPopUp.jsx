import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useState } from 'react';
import Select from 'react-select';

import api from '../../api';
import './addMembersPopUp.css'

export default function AddMembersPopUp({ updateTripPage, tripId, hidePopUp }) {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  async function getUserData(inputValue) {
    await api.get("/users", {
      params: {
        search_key: inputValue,
        trip_id: tripId
      },
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status = 201) {
        let userData = []
        response.data.users.map(user => {
          userData.push({
            value: user._id,
            label: user.name
          })
        });
        setUserList(userData)
      }
    }).catch(err => {
      console.log(err.response)
    })
  }

  async function addMembers() {
    let selectedMembId = [];
    selectedUser.map((user) => {
      selectedMembId.push(user.value)
    })
    let apiData = {
      "trip_id": tripId,
      "member_ids": selectedMembId
    }
    await api.post("/add-trip-members", apiData, {
      headers: {
        "x-access-token": localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status = 201) {
        console.log(response.data)
      }
      hidePopUp();
      updateTripPage();
    }).catch(err => {
      console.log(err.response)
    })
  }

  function handleChange(newValue) {
    setSelectedUser(newValue);
  };

  function handleInputChange(inputValue) {
    getUserData(inputValue);
  };

  return (
    <Alert className='add-members-pop-up' onClose={hidePopUp}>
      <div className='alert-fields'>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isMulti
          placeholder="Search"
          defaultValue={''}
          isClearable={true}
          isSearchable={true}
          name="user"
          options={userList}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
        <Button className='save-button-add-memb-pop-up' style={{ marginTop: '50px' }} variant="contained" onClick={addMembers}>Save Members</Button>
      </div>
    </Alert>
  )
}