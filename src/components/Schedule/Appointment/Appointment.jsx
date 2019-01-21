import React from 'react'
import './Appointment.css'
import moment from 'moment'


function Appointment(props) {
  const { id, first, last, date, start, end, paid, email, phone, comment } = props
  const endTime = moment(end, 'hh:mm a')
  const startTime = moment(start, 'hh:mm a')
  const duration = moment.duration(endTime.diff(startTime)).as('m')
  // console.log(duration)
  if (props.admin === true) {
    return (
      <tr>
        <td>{first} {last}</td>
        <td type='date'>{date}</td>
        <td>{start}</td>
        <td>{duration} </td>
        <td>{paid ? 'Paid' : 'Payment needed'}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{comment}</td>
      </tr>


    )
  } else {
    return (
      <tr>
        <td type='date'>{date}</td>
        <td>{start}</td>
        <td>{duration} </td>
        <td>{paid ? 'Paid' : 'Payment needed'}</td>
        <td>{comment}</td>
        <td> <button onClick={()=>props.toggleEdit(id)}>Edit</button> </td>
        <td> <button onClick={()=>props.deleteAppt(id)}>Delete</button></td>
      </tr>


    )
  }

}

export default Appointment