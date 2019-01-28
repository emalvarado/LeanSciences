import React, { Component } from 'react'
import axios from 'axios'
import './Contact.scss'
import Swal from 'sweetalert2'


class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  handleSubmit = async () => {
    const { name, email, phone, message } = this.state
    let res = await axios.post('/send', { name, email, phone, message })
    this.setState({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    Swal.fire(res.data.message)
  }

  render() {
    return (
      <div className='contactPage'>
        <div className='contactDiv'>
          <h1>Contact Us</h1>
          <p>Contact us with any general questions you may have or inquiries regarding our in-home and online training and nutrition coaching services.</p>
          <div className='contactInputs'>
            <div>
              <label>Name:</label>
              <br/>
              <input onChange={(e) => this.handleChange('name', e.target.value)} type="text" />
            </div>
            <div>
              <label>Email Address:</label>
              <br/>
              <input onChange={(e) => this.handleChange('email', e.target.value)} type="email" />
            </div>
            <div>
              <label>Phone:</label>
              <br/>
              <input onChange={(e) => this.handleChange('phone', e.target.value)} type="tel" />
            </div>
            <div>
              <label>Message:</label>
              <br/>
              <textarea onChange={(e) => this.handleChange('message', e.target.value)} type="text"></textarea>
              <br/>
              <br/>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        <div className='mapDiv'>
        <h3>Servicing</h3>
        <p>Online: Worldwide</p>
        <p>In-Home: Plymouth County and Southern Boston Area</p>
        <h4>South Shore, MA</h4>
        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.326667192442!2d-70.71764168385494!3d41.971795667523146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU4JzE4LjUiTiA3MMKwNDInNTUuNiJX!5e0!3m2!1sen!2sus!4v1548377594971" width="450" height="450" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
        </div>

      </div>
    )
  }
}

export default Contact