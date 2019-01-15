import React from 'react'
import './Nav.css'
import logo from '../../images/download.png'
import {Link} from 'react-router-dom'


function Nav(props){
  return(
    <div className='nav'>
    <Link to='/'>
      <div className='logo'>
      <img src={logo} alt="logo"/>
      </div>
      </Link>

      <div className='menu'>
      <ul className='menuList'>
        <Link to='/'><li className='menuItem'>Home</li></Link>
        <Link to='/Schedule'> <li className='menuItem'>Schedule</li></Link>
        <Link to='/Contact'> <li className='menuItem'>Contact</li></Link>
        <Link to='/Login'> <li className='menuItem'>Login</li></Link>
      </ul>

      </div>


    </div>
  )
}

export default Nav