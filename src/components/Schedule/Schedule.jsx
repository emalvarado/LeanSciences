import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { selectTime } from '../../ducks/reducer'
// import { userInfo } from 'os';
import Appointment from './Appointment/Appointment'
import './Schedule.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avail from './Availability/Avail'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Swal from 'sweetalert2'
import StripeCheckout from "react-stripe-checkout";




class Schedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appts: [],
      avail: [],
      selectedDay: new Date(),
      disabledDays: [],
      duration: 0,
      pricePerHour: 60,
      paid: false,
      showApptCreator: false

    }
  }

  componentDidMount() {
    const { user } = this.props
    if (user.admin === true) {
      this.getAllClientAppts()
      this.getAvailability()

    }
    // console.log(new Date())
    // console.log(new Date(moment().add(1, "days")),)
    if (user.id && !user.admin) {
      this.getAvailability()
      this.getSingleClientAppts()
    }
  }

  // componentDidUpdate(oldProps) {

  // }

  getAllClientAppts = async () => {
    const res = await axios.get('/api/appts')
    //  console.log(res.data)
    this.setState({
      appts: res.data
    })
  }

  getAvailability = async () => {
    const res = await axios.get('/api/avail')
    this.setState({
      avail: res.data
    })
  }

  getSingleClientAppts = async () => {
    const { user } = this.props
    const res = await axios.get(`/api/appts/${user.id}`)
    this.setState({
      appts: res.data
    })
  }

  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({
        selectedDay: undefined,
      })
      this.props.selectTime()
      return;
    }
    this.setState({ selectedDay: day });
    this.props.selectTime()

  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  toggleApptCreator = () => {
    this.setState({
      showApptCreator: !this.state.showApptCreator
    })
  }

  createAppt = async () => {
    const { selectedDay: date, duration, pricePerHour, paid } = this.state
    const { selectedTime: start, user } = this.props
    const startTime = moment(start, 'hh:mm a')
    const endTime = startTime.add(duration, 'm')
    const end = endTime.format('h:mm a')
    // console.log(duration)
    let price = (duration / 60) * pricePerHour

    let res = await axios.post('/api/appt', { date, start, end, price, paid, user_id: user.id })
    this.getSingleClientAppts()
    // console.log(res.data)

  }

  toggleEdit = async (id) => {
    const { value: text } = await Swal({
      title: 'Edit your comment',
      input: 'textarea',
      inputPlaceholder: 'Type your comment here...',
      showCancelButton: true
    })

    if (text) {
      let res = await axios.put(`/api/appt/${id}`, { comment: text })
      Swal('Your comment has been edited')
      this.getSingleClientAppts()
    }
  }

  deleteAppt = (id) => {
    axios.delete(`/api/appt/${id}`).then(
      this.getSingleClientAppts()
    )
  }

  onToken = async token => {
    const body = {
      amount: 999,
      token: token
    };
    let res = await axios.post("http://localhost:4000/payment", body)
    console.log(res);
    alert("Payment Success");
  };




  render() {
    const { appts, avail, selectedDay, duration, pricePerHour } = this.state
    let apptsToDisplay = appts.map((appt, i) => {
      return <Appointment key={i}
        date={appt.appt_date}
        id={appt.id}
        start={appt.appt_start}
        end={appt.appt_end}
        // duration={appt.duration}
        price={appt.appt_price}
        paid={appt.appt_paid}
        confirm={appt.appt_confirmation}
        userId={appt.user_id}
        first={appt.user_first}
        last={appt.user_last}
        email={appt.user_email}
        phone={appt.user_phone}
        admin={this.props.user.admin}
        comment={appt.comment}
        toggleEdit={this.toggleEdit}
        deleteAppt={this.deleteAppt} />
    })

    let availToDisplay = avail.map((slot, i) => {
      // console.log('selectedDay:', moment(selectedDay).format('L'), 'avail:', moment(slot.appt_date).format('L'))
      let formatSelected = moment(selectedDay).format('L');
      let formatAvail = moment(slot.appt_date).format('L')
      if (formatSelected === formatAvail) {
        return <Avail key={i}
          id={slot.id}
          date={slot.appt_date}
          start={slot.appt_start}
          end={slot.appt_end}
          userId={slot.user_id}
          selectedDay={selectedDay} />
      }
    })

    const publishableKey = "pk_test_FLghdYFLkoTz2zNOcKlZRKWU";



    return (
      <div>

        {
          this.state.avail[0] ?
            <div>
              <button onClick={this.toggleApptCreator}>Schedule an Appointment</button>
              {this.state.showApptCreator ?
                <div className='apptCreator'>
                  <h1>Availability</h1>
                  <div className='apptContainers'>
                    <div className='calender'>
                      <DayPicker
                        onDayClick={this.handleDayClick}
                        selectedDays={this.state.selectedDay}
                        disabledDays={this.state.disabledDays}
                      />
                      {this.state.selectedDay ? (
                        <p>{this.state.selectedDay.toLocaleDateString()}</p>
                      ) : (
                          <p>Please select a day.</p>
                        )}
                    </div>

                      <ul className='timesBox'>
                        {availToDisplay}

                      </ul>

                    <div className='durationSelection'>
                      {this.props.selectedTime}

                      <label for="duration">Select a duration:</label>
                      <select onChange={(e) => { this.handleChange('duration', e.target.value) }}
                        name="Duration" id="duration"> Duration:
          <option value=''>--select a duration--</option>
                        <option value='30'>30 Minutes</option>
                        <option value='60'>60 Minutes</option>
                        <option value='90'>90 Minutes</option>
                        <option value='120'>120 Minutes</option>
                      </select>


                      <StripeCheckout
                        label="Pay Now" //Component button text
                        // name="Lean Sciences" //Modal Header
                        // description="Pay for your session."
                        panelLabel="Pay Now" //Submit button in modal
                        amount={(duration / 60) * pricePerHour * 100} //Amount in cents $9.99
                        token={this.onToken}
                        stripeKey={publishableKey}
                        billingAddress={false}
                      />

                      <button onClick={this.createAppt}>Schedule Session</button>

                    </div>
                  </div>

                </div>
                :
                null
              }

            </div>
            :
            null

        }


        {this.state.appts[0] && this.props.user.admin === true ?
          <div>

            <h1>Schedule</h1>
            <table>
              <tr>
                <th scope="col">Client Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Payment</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Comments</th>
                <th scope="col" colspan="2">Select</th>
              </tr>
              {apptsToDisplay}
            </table>
            {/* <button>Delete Selection</button> */}
          </div>
          :
          this.state.appts[0] ?
            <div>

              <h1>Schedule</h1>
              <table>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Comments</th>
                  <th scope="col" colspan="2">Select</th>
                </tr>
                {apptsToDisplay}
              </table>
              {/* <button>Delete Selection</button> */}

            </div>
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


      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { selectTime })(Schedule)