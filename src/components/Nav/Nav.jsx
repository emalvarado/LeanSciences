import React, {Component} from 'react'
import './Nav.css'
import logo from '../../images/download.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {getUserData} from '../../ducks/reducer'
import axios from 'axios'


class Nav extends Component {

  logout = () => {
    axios.get('/auth/logout').then( () =>{
      // console.log(res)
      this.props.getUserData({user:{}})
    })
  }

  render(){
    return (
      <div className='nav'>
        <Link to='/'>
          <div >
            <img className='logo' src={logo} alt="logo" />
          </div>
        </Link>
  
        <div className='menu'>
          <ul className='menuList'>
            <Link to='/'><li className='menuItem'>Home</li></Link>
            <Link to='/Schedule'> <li className='menuItem'>Schedule</li></Link>
            <Link to='/Contact'> <li className='menuItem'>Contact</li></Link>
            {this.props.user.first ?
              <div>
              <Link to='/Login'> <li onClick={this.logout} className='menuItem'>Logout</li></Link>
              <span className='displayName'>Hi, {this.props.user.first} </span>
              </div>
              :
              <Link to='/Login'> <li className='menuItem'>Login</li></Link>
            }
          </ul>
  
  
        </div>
  
  
      </div>
    )
  }

}



const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getUserData})(Nav)