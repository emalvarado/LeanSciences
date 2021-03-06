import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// import { userInfo } from 'os';
import Appointment from './Appointment/Appointment'
import './Schedule.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avail from './Availability/Avail'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Swal from 'sweetalert2'
import Checkout from '../stripe/Checkout';
import { getUserData, setPaid, selectTime } from '../../ducks/reducer'
import paidIcon from '../../images/paid_1010814.png'
import io from "socket.io-client";


import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


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
      showApptCreator: false,
      start: '',
      end: '',
      comment: ''

    }
    this.socket = io.connect({ secure: true });
    this.socket.on("recieved", data =>
      this.multiDoer()
    );
  }

  componentDidMount() {
    this.multiDoer()
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.user.id, this.props.user.id)
    if (prevProps.user.id !== this.props.user.id) {
      this.multiDoer()
    }
  }



  multiDoer() {
    const { user } = this.props
    if (user.admin === true) {
      this.getAllClientAppts()
      this.getAvailability()
    }
    if (user.id && !user.admin) {
      this.getSingleClientAppts()
      this.getAvailability()
    }
  }

  getAllClientAppts = async () => {
    const res = await axios.get('/api/appts')
    //  console.log(res.data)
    this.setState({
      appts: res.data
    })
  }



  getSingleClientAppts = async () => {
    const { user } = this.props
    const res = await axios.get(`/api/myAppts/${user.id}`)
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
        selectedDay: null,
      })
      this.props.selectTime()
      return;
    }
    this.setState({ selectedDay: day }, () => {
      this.props.selectTime()
      this.props.setPaid()
    });

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
    const { selectedDay: date, duration, pricePerHour, comment } = this.state
    const { selectedTime: start, user, paid } = this.props
    let startTime = moment(start, 'h:mm a')
    const endTime = startTime.clone().add(duration, 'm')
    const end = moment(start, 'h:mm a').add(duration, 'm').format('h:mm A')
    // console.log(duration)
    let price = (duration / 60) * pricePerHour

    // console.log(startTime, endTime, duration, formatDate)

    while (endTime > startTime) {
      let slot = startTime.format('h:mm A')
      console.log('slot and date from createAppt', slot, date)
      await axios.put(`/api/appts`, { date, start: slot })
      startTime = startTime.clone().add(30, 'm')
    }
    await axios.post('/api/appt', { date, start, end, price, paid, user_id: user.id, comment })
    this.setState({
      comment: '',
      selectedTime: '',
    })
    await this.multiDoer()
    this.toggleApptCreator()
    this.props.setPaid()
    this.props.selectTime()
    this.socket.emit('blast', {
      avail: this.state.avail,
      appts: this.state.appts
    })
    this.setState({
      comment: '',
      selectedDay: new Date()
    })

    // console.log(res.data)

  }

  deleteAppt = async (id, date, start, end) => {
    // const { pricePerHour, paid } = this.state
    let startTime = moment(start, 'h:mm a')
    const endTime = moment(end, 'h:mm a')
    while (endTime > startTime) {
      let slot = startTime.format('h:mm A')
      await axios.post(`/api/appt`, { date, start: slot, user_id: 5 })
      startTime = startTime.clone().add(30, 'm')
    }
    await axios.delete(`/api/appt/${id}`)
    this.multiDoer()
    this.socket.emit('blast', {
      avail: this.state.avail,
      appts: this.state.appts
    })
  }

  getAvailability = async () => {
    let formatDate = moment(this.state.selectedDay).format('M-D-YYYY')
    let date = encodeURI(formatDate)
    let res = await axios.get(`/api/avail/${date}`)
    this.setState({
      avail: res.data
    })
  }



  addAvailability = async () => {
    const { start, end, selectedDay: date } = this.state
    let startTime = moment(start, 'h:mm a').subtract(30, 'm')
    let endTime = moment(end, 'h:mm a').subtract(1, 'h')
    // let initialTime = moment(start, 'h:mm a')
    // let avail = [initialTime]
    while (endTime > startTime) {
      let slot = startTime.clone().add(30, 'm').format('h:mm A')
      await axios.post('/api/appt', { date, start: slot, user_id: this.props.user.id })
      startTime.add(30, 'm')
    }
    this.getAvailability()
    this.socket.emit('blast', {
      avail: this.state.avail,
      appts: this.state.appts
    })
  }

  toggleEdit = async (id) => {
    const { value: text } = await Swal({
      title: 'Edit your comment',
      input: 'textarea',
      inputPlaceholder: 'Type your comment here...',
      showCancelButton: true
    })

    if (text) {
      await axios.put(`/api/appt/${id}`, { comment: text })
      Swal('Your comment has been edited')
      this.getSingleClientAppts()
    }
  }








  render() {
    const { appts, duration, pricePerHour } = this.state
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
        deleteAppt={this.deleteAppt}
      />
    })





    return (
      <div className='schedulePage'>

        {
          this.props.user.id
            //logged in
            ?
            <div className='visibleDiv'>
              <div className='toggleBtnDiv'>
                <button className='toggleBtn' onClick={this.toggleApptCreator}>{!this.props.user.admin ? 'Schedule an Appointment' : 'Add Availability'}</button>
              </div>

              <div className={this.state.showApptCreator ? 'apptCreatorBackground' : 'apptCreatorBackground hidden'} >
                <div className='apptCreator'>
                  <h1>Availability</h1>
                  <div className='apptContainers'>
                    <div className='calender'>
                      <DayPicker
                        formatDate={formatDate}
                        parseDate={parseDate}
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

                    <Avail
                      selectedDay={this.state.selectedDay}
                      avail={this.state.avail}
                      getAvailability={this.getAvailability} />

                    {
                      !this.props.user.admin
                        //client
                        ?
                        <div className='durationSelection'>


                          <div>
                            <div className='selectedTime'>
                              {this.props.selectedTime}
                            </div>
                            <label for="duration">Select a duration:</label>
                            <select onChange={(e) => { this.handleChange('duration', e.target.value) }}
                              name="Duration" id="duration"> Duration:
                              <option value=''>--select a duration--</option>
                              <option value='30'>30 Minutes</option>
                              <option value='60'>60 Minutes</option>
                              <option value='90'>90 Minutes</option>
                              <option value='120'>120 Minutes</option>
                            </select>
                          </div>

                          <div>
                            <label for='commentInput'>Comments:</label>
                            <br />
                            <textarea placeholder='What would you like to focus on?'
                              id='commentInput' type="text" onChange={e => { this.handleChange('comment', e.target.value) }}></textarea>
                          </div>

                          <div>
                            {
                              this.props.paid
                                ?
                                <img className='paidIcon' src={paidIcon} alt="paid" />
                                :
                                <Checkout
                                  amount={(duration / 60) * pricePerHour * 100}
                                />
                            }


                            <button onClick={this.createAppt}>Schedule Session</button>
                          </div>



                        </div>
                        :
                        //admin
                        <div className='timeSelection'>
                          <div>
                            <label>Start time:</label>
                            <br />
                            <input onChange={e => this.handleChange('start', e.target.value)} type="time" placeholder='h:mm am' />
                          </div>
                          <div>
                            <label>End time:</label>
                            <br />
                            <input onChange={e => this.handleChange('end', e.target.value)} type="time" placeholder='h:mm am' />
                            <br/>
                            <br/>
                          <button className='addBtn' onClick={this.addAvailability}>Add Availability</button>
                          </div>
                        </div>
                    }
                  </div>
                  <button className='finishBtn' onClick={this.toggleApptCreator}>{!this.props.user.admin ? 'Cancel' : 'Finish'}</button>
                </div>
              </div>

              {
                !this.props.user.admin
                ?
              <div className='scheduleQuote'>
                <p>"You can have results or excuses</p>
                <p>not both."</p>
                <p>-Arnold Schwarzenegger</p>
              </div>
              :
              null
              }

              {
                this.state.appts[0]
                  //logged in user has upcoming appointments
                  ?
                  <div className='schedule'>
                    <h1>Schedule</h1>
                    <div className='table'>
                      <table>
                        {
                          !this.props.user.admin
                            ?
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Time</th>
                              <th scope="col">Duration (min)</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Comments</th>
                              <th scope="col" colspan="2">Edit</th>
                            </tr>
                            :
                            <tr>
                              <th scope="col">Client Name</th>
                              <th scope="col">Date</th>
                              <th scope="col">Time</th>
                              <th scope="col">Duration (min)</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Email</th>
                              <th scope="col">Phone Number</th>
                              <th scope="col">Comments</th>
                              <th scope="col" colspan="2">Edit</th>
                            </tr>
                        }
                        {apptsToDisplay}
                      </table>

                    </div>
                  </div>
                  :
                  //logged in user has no upcoming appointments
                  <div>
                    {
                      !this.props.user.admin
                        //logged in user with no upcoming appointments is a client
                        ?
                        <h3> No upcoming appointments. Book your training session today!</h3>
                        :
                        //logged in user with no upcoming appointments is an admin
                        <h3>No upcoming appointments</h3>
                    }
                  </div>
              }

            </div>
            :
            // not logged in
            <div className='noUserInfo'>
              <h3> Member? <Link className='inlineLink' to='/login'>Log in</Link> to book your training session.</h3>
              <h3> New here? <Link className='inlineLink' to='/login'>Register</Link> now to book your free consultation!</h3>
            </div>

        }

      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { selectTime, getUserData, setPaid })(Schedule)