import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Schedule from './components/Schedule/Schedule'
import Contact from './components/Contact/Contact'


export default(
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/schedule' component={Schedule} />
    <Route path='/Contact' component={Contact} />
  </Switch>
)