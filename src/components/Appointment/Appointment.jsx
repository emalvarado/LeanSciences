import React from 'react'
import './Appointment.css'

function Appointment(props) {
  return (

    <tr>
      <td scope="row">{props.first} {props.last}</td>
      <td type='date'>{props.date}</td>
      <td>{props.start}</td>
      <td>{props.duration.minutes ? ((props.duration.hours)*60) + props.duration.minutes
      : (props.duration.hours)*60} </td>
      <td>{props.paid ? 'Paid' : 'Payment needed'}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>


  )
}

export default Appointment