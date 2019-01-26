import React, { Component } from 'react'
import moment from 'moment'
import './Avail.scss'
import { connect } from 'react-redux'
import { selectTime } from '../../../ducks/reducer'
import { link } from 'fs';
import axios from 'axios'





class Avail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avail: []
    }
  }

componentDidMount = () => {
  this.getAvailability()
}

componentDidUpdate(prevProps) {
  if(prevProps.selectedDay !== this.props.selectedDay) {
    this.getAvailability()
  }
}

  getAvailability = async () => {
    let formatDate = moment(this.props.selectedDay).format('M-D-YYYY')
    let date = encodeURI(formatDate)
    // console.log(date)
    let res = await axios.get(`/api/avail/${date}`)
    this.setState({
      avail: res.data
    })
  }


  render() {
    const {avail} = this.state
    console.log(this.state)
    let availToDisplay = avail.map((slot, i) => {
      const startTime = moment(slot.appt_start, 'H:mm:ss').format('h:mm a')
      if (!this.props.user.admin) {
        return (
          <button onClick={() => this.props.selectTime(startTime)}>{startTime}</button>
        )
      } else {
        return (
          <li>{startTime}</li>
        )
      }
    })
    return (
      <div
        className='availMulti'>
        {availToDisplay}
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState


export default connect(mapStateToProps, { selectTime })(Avail)