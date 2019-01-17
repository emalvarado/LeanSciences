import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { userInfo } from 'os';
import Appointment from '../Appointment/Appointment'
import './Schedule.css'
import { Link } from 'react-router-dom'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Swal from 'sweetalert2'

const localizer = BigCalendar.momentLocalizer(moment)


class Schedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appts: [],
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ]
    }
  }

  componentDidMount() {
    const { user } = this.props
    if (user.admin === true) {
      this.getAllClientAppts()
    }
    console.log(new Date())
    console.log(new Date(moment().add(1, "days")),)
  }

  getAllClientAppts = async () => {
    const res = await axios.get('/api/appts')
    //  console.log(res.data)
    this.setState({
      appts: res.data
    })
  }

  handleSelect = async ({ start, end }) => {
    const {user} = this.props
    const name = `${user.first} ${user.last}`
    const title = await this.chooseTitle()
    
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  chooseTitle = async () => {
    const {value: selection} = await Swal({
      title: 'What type of appointment would you like to make?',
      showCancelButton: true,
      input: 'select',
      inputOptions: {
        'training session': 'Training Session',
        'consultation': 'Consultation',
      },
      inputPlaceholder: 'Select a category',
    })
    
    
   return selection

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
        {this.state.appts[0] ?
          <table>
            <tr>
              <th scope="col">Client Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Payment</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
            {apptsToDisplay}
          </table>
          :
          this.props.user.admin === true ?
            <h3>No upcoming appointments</h3>
            :
            this.props.user.id ?
              <h3> No upcoming appointments. Book your training session today!</h3>
              :
              <div>
                <h3> Member? <Link className='inlineLink' to='/login'>Log in</Link> to book your training session.</h3>
                <h3> New here? <Link className='inlineLink' to='/login'>Register</Link> now to book your free consultation!</h3>
              </div>
        }

        <div className='calender'>

        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={BigCalendar.Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={this.chooseTitle}
          onSelectSlot={this.handleSelect}
          allDayAccessor={false}
          // min={'12:00PM'}
        />
        </div>

<button onClick={this.chooseTitle}>button</button>


      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Schedule)