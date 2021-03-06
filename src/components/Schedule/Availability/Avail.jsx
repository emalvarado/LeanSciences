import React, { Component } from 'react'
import moment from 'moment'
import './Avail.scss'
import { connect } from 'react-redux'
import { selectTime } from '../../../ducks/reducer'





class Avail extends Component {
  // constructor(props) {
  //   super(props)

  // }

// componentDidMount = () => {
//   this.getAvailability()
// }

componentDidUpdate(prevProps, prevState) {
  if(prevProps.selectedDay !== this.props.selectedDay || prevProps.avail.length !== this.props.avail.length) {
    this.props.getAvailability()
  }
}

//   getAvailability = async () => {
//     let formatDate = moment(this.props.selectedDay).format('M-D-YYYY')
//     let date = encodeURI(formatDate)
//     // console.log(date)
//     let res = await axios.get(`/api/avail/${date}`)
//     this.setState({
//       avail: res.data
//     })
//   }


  render() {
    const {avail} = this.props
    // console.log(this.state)
    let availToDisplay = avail.map((slot, i) => {
      const startTime = moment(slot.appt_start, 'H:mm:ss').format('h:mm a')
      if (!this.props.user.admin) {
        return (
          <button key={i} onClick={() => this.props.selectTime(startTime)}>{startTime}</button>
        )
      } else {
        return (
          <li key={i} >{startTime}</li>
        )
      }
    })
    return (
      <div
        className='availMulti'>
        {
          availToDisplay[0]
        ?
        <h6>Available Times:</h6>
        :
        <h6>No openings available.</h6>
      }
        {availToDisplay}
      </div>
    )
  }
}

const mapStateToProps = reduxState => reduxState


export default connect(mapStateToProps, { selectTime })(Avail)