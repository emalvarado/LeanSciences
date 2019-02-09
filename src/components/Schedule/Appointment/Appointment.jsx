import React from 'react'
import './Appointment.scss'
import moment from 'moment'


function Appointment(props) {
  const { id, first, last, date, start, end, paid, email, phone, comment } = props
  const endTime = moment(end, 'H:mm:ss')
  const startTime = moment(start, 'H:mm:ss')
  const duration = moment.duration(endTime.diff(startTime)).as('m')
  const formattedDate = moment.utc(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('M/D/YYYY')
  const formattedStart = startTime.format('h:mm a')
  // console.log(duration)
  if (props.admin === true) {
    return (
      <tr>
        <td>{first} {last}</td>
        <td type='date'>{formattedDate}</td>
        <td>{formattedStart}</td>
        <td>{duration} </td>
        <td>{paid ? 'Paid' : 'Payment needed'}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{comment}</td>
        <td> <button onClick={()=>props.deleteAppt(id, date, start, end)}>Cancel Session</button></td>
      </tr>


    )
  } else {
    return (
      <tr>
        <td type='date'>{formattedDate}</td>
        <td>{formattedStart}</td>
        <td>{duration} </td>
        <td>{paid ? 'Paid' : 'Payment needed'}</td>
        <td>{comment}</td>
        <td> <button onClick={()=>props.toggleEdit(id)}>Edit</button> </td>
        <td> <button onClick={()=>props.deleteAppt(id, date, start, end)}>Cancel Session</button></td>
      </tr>


    )
  }

}

export default Appointment