import React, { Component } from 'react'
import moment from 'moment'
import './Avail.css'
import { connect } from 'react-redux'
import { selectTime } from '../../../ducks/reducer'
import { link } from 'fs';





class Avail extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   timeSlots: [],
    //   // selectedTime: ''
    // }
  }



  render() {
    const { id, date, start, end, userId } = this.props
    let startTime = moment(start, 'HH:mm:ss').format('h:mm a')
    return (
      <div
      className='availMulti'>

      {
        this.props.user.admin === true ?
        <li>{startTime}</li>
        :
        <button onClick={()=>this.props.selectTime(startTime)}>{startTime}</button>

      }
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState


export default connect(mapStateToProps, { selectTime })(Avail)