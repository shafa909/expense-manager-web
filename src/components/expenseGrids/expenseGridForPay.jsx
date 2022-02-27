import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

import './expenseGrid.css'
import api from '../../api';

export default function TripGridForPay({ updateTripPage, bgColor, expense }) {
  const [payAmount, setPayAmonut] = useState('');
  const [showPayBtn, setShowPayBtn] = useState(false)
  const [showTextBox, setShowTextBox] = useState(true)

  async function makePayment(e) {
    let apiData = {
      "amount": payAmount,
      "transaction_id": expense._id
    }
    await api.post("/update-transaction", apiData, {
      headers: {
        "x-access-token": localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status === 201) {
        console.log(response.data)
      }
      updateTripPage()
      setPayAmonut('');
    }).catch(err => {
      console.log(err.response)
    })
  }

  function handleChange(newValue) {
    setPayAmonut(parseInt(newValue))
    if (expense.paid_amount + parseInt(newValue) <= expense.amount && newValue) {
      setShowPayBtn(true)
    } else {
      setShowPayBtn(false)
    }
  };

  useEffect(() => {
    if (expense.amount === expense.paid_amount) {
      setShowTextBox(false);
    }
  }, []);

  return (
    <div className='expense-grid-box-pay' style={{ backgroundColor: bgColor }} >
      <h3 className='expense-name'>
        {expense.expense_name}
      </h3>
      <p className='expense-amount'>
        <b>total Amount:  {expense.total_amount}</b>
      </p>
      <p className='trip-created-by'>
        You Owes $<b>{expense.amount}</b> to  <b>{expense.created_name}</b>, Paid: <b> {expense.paid_amount} </b>
      </p>
      <p className='trip-created-by'>
        Balance: $<b>{expense.amount - expense.paid_amount} </b>
      </p>
      {showTextBox ?
        <TextField
          className='pay-text-box'
          label="Enter Amount To pay"
          value={payAmount}
          size="small"
          type="number"
          onChange={(e) => handleChange(e.target.value)}
        />
        : ''
      }
      {showPayBtn ?
        <Button className='pay-btn' style={{ marginTop: '50px' }} variant="contained" onClick={makePayment} >Pay</Button>
        : ''
      }
    </div>
  )
}