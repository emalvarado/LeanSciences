import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { userInfo } from 'os';
import Appointment from '../Appointment/Appointment'
import { Table } from 'react-bootstrap'
import './Schedule.css'


class Schedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appts: []
    }
  }

  componentDidMount() {
    const { user } = this.props
    if (user.admin === true) {
      this.getAllClientAppts()
    }
  }

  getAllClientAppts = async () => {
    const res = await axios.get('/api/appts')
    //  console.log(res.data)
    this.setState({
      appts: res.data
    })
  }

  render() {
    const { appts } = this.state
    let apptsToDisplay = appts.map((appt, i) => {
      return <Appointment key={i}
        date={appt.appt_date}
        id={appt.id}
        start={appt.appt_start}
        end={appt.appt_end}
        duration={appt.duration}
        price={appt.appt_price}
        paid={appt.appt_paid}
        confirm={appt.appt_confirmation}
        userId={appt.user_id}
        first={appt.user_first}
        last={appt.user_last}
        email={appt.user_email}
        phone={appt.user_phone} />
    })
    return (
      <div>
        <h1>Schedule</h1>
        <table>
        <tr>
        <th scope="col">Client Name</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Duration</th>
        <th scope="col">Payment</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
    </tr>
        {apptsToDisplay}
        </table>


      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Schedule)