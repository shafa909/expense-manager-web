import './tripGrid.css'
import { Link } from "react-router-dom";
import Moment from 'moment';


export default function TripGrid({ tripData, bgColor }) {

  return (
    <Link to={'/trip/' + tripData._id} style={{ textDecoration: 'none' }}>
      <div className='trip-grid-box' style={{ backgroundColor: bgColor }} >
        <h2 className='trip-name'>
          {tripData.name}
        </h2>
        <h4 className='trip-created-date'>
          Created on :{Moment(new Date(tripData.createdAt)).format("YYYY-MM-DD hh:mm:ss")}
        </h4>
        <p className='trip-desc'>
          <b>Description :</b>{tripData.desc}
        </p>
        <p className='trip-member-count'>
          <b>Total Memb :</b> {tripData.member_ids.length}
        </p>
        <p className='trip-created-by'>
          <b>Trip created by :</b> {tripData.creater_name}
        </p>
      </div>
    </Link>
  )
}