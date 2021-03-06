import React, { Component } from 'react'
import axios from 'axios'
import './Login.scss'
import {connect} from 'react-redux'
import {getUserData} from '../../ducks/reducer'
import Swal from 'sweetalert2'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPass: '',
      first: '',
      last: '',
      phone: ''
    }
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  register = async () => {
    const { email, password, confirmPass, first, last, phone } = this.state
    if (password === confirmPass) {
      let res = await axios.post('/auth/register', { email, password, first, last, phone })
      if (res.data.loggedIn) {
      this.props.getUserData(res.data.userData)
        this.props.history.push('/')
      } else {
        const message = res.data.message
        // console.log(message)
        Swal({
          type: 'error',
          title: 'Oops...',
          text: message,
          footer: 'Please try again'
        })
        // alert(res.data.message)

      }
    } else {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
        footer: 'Please try again'
      })
      // alert('Passwords do not match')
    }
  }

  login = () => {
    const { email, password } = this.state
    axios.post('/auth/login', { email, password }).then(res => {
      if (res.data.loggedIn) {
      this.props.getUserData(res.data.userData)
        this.props.history.push('/')
      } else {
        const message = res.data.message
        // console.log(message)
        Swal({
          type: 'error',
          title: 'Oops...',
          text: message,
          footer: 'Please try again'
        })
        // alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })

  }



  render() {
    return (
      <div className='loginpage'>
        <div className='mainbox'>

          <div className='loginbox'>
            <h1 className='loginHeader login'>Log In</h1>
            <div className='inputs'>
              <div className='userInput'>
                <p>Email:</p>
                <input onChange={(e) => this.handleChange('email', e.target.value)} type="text" />
              </div>
              <div className='userInput'>
                <p>Password:</p>
                <input onChange={(e) => this.handleChange('password', e.target.value)} type="password" />
                <br />
                <button className='loginButton' onClick={this.login}>Log In</button>
              </div>

            </div>
          </div>

          <div className='loginbox'>
            <h1 className='loginHeader'>Register</h1>
            <div className='inputs'>
              <div className='userInput'>
                <p>First Name:</p>
                <input onChange={(e) => this.handleChange('first', e.target.value)} type="text" />
              </div>
              <div className='userInput'>
                <p>Last Name:</p>
                <input onChange={(e) => this.handleChange('last', e.target.value)} type="text" />
              </div>
              <div className='userInput'>
                <p>Phone:</p>
                <input onChange={(e) => this.handleChange('phone', e.target.value)} type="text" />
              </div>
              <div className='userInput'>
                <p>Email:</p>
                <input onChange={(e) => this.handleChange('email', e.target.value)} type="text" />
              </div>
              <div className='userInput'>
                <p>Password:</p>
                <input onChange={(e) => this.handleChange('password', e.target.value)} type="password" />
              </div>
              <div className='userInput'>
                <p>Confirm Password:</p>
                <input onChange={(e) => this.handleChange('confirmPass', e.target.value)} type="password" />
                <br />
                <button className='loginButton' onClick={this.register}>Register</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


export default connect(null, {getUserData}) (Login)