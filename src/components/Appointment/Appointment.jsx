import React from 'react'

function Appointment(props) {
  return (

    <tr>
      <td scope="row">{props.first} {props.last}</td>
      <td>{props.date}</td>
      <td>{props.start}</td>
      <td>{props.duration}</td>
      <td>{props.paid ? 'Paid' : 'Payment needed'}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>


  )
}

export default Appointment