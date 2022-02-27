import './expenseGrid.css'


export default function TripGrid({ bgColor, expenseList }) {
  return (
    <div className='expense-grid-box' style={{ backgroundColor: bgColor }} >
      <h3 className='expense-name'>
        {expenseList[0].expense_name}
      </h3>
      <p className='expense-amount'>
        <b>You Spent: </b>  {expenseList[0].total_amount}
      </p>
      {
        expenseList ?
          expenseList.map(function (expence, i) {
            return (
              <p className='trip-created-by'>
                <b>{expence.created_name}</b> Owes you: {expence.amount} , Paid: {expence.paid_amount}
              </p>
            )
          }) : ''
      }
    </div>
  )
}