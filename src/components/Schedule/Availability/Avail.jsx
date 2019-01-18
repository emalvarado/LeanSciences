import React, { Component } from 'react'
import moment from 'moment'
import './Avail.css'
import { connect } from 'react-redux'
import { selectTime } from '../../../ducks/reducer'





class Avail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeSlots: [],
      // selectedTime: ''
    }
  }



  render() {
    const { id, date, start, end, userId } = this.props
    let dateFormat = moment(date).format('dddd')

    let startTime = moment(start, 'HH:mm')
    let endTime = moment(end, "HH:mm").subtract(1, 'h')
    let initialTime = moment(start, 'HH:mm')
    let slots = [initialTime]

    while (endTime > startTime) {
      let slot = startTime.clone().add(30, 'm')
      slots.push(slot)
      startTime.add(30, 'm')
    }

    // console.log(slots)

    let slotsToDisplay = slots.map((slot, i) => {
      return <li>
        <button
          onClick={() => this.props.selectTime((slot.format('h:mm A')))}
        >{slot.format('h:mm A')} </button></li>
    })


    return (
      <div
        className='availMulti'>
        {/* {dateFormat} {start} {end}  */}
        {/* {dateFormat} */}
        {slotsToDisplay}

        {/* {this.props.selectedTime} */}


      </div>
    )
  }
}



export default connect(null, { selectTime })(Avail)