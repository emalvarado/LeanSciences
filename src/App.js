import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import NavComp from './components/Nav/Nav'
import routes from './routes'
import Footer from './components/Footer/Footer';
import {withRouter} from 'react-router-dom';
import {getUserData} from './ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {

componentDidMount(){
axios.get('/api/user').then( res => {
  this.props.getUserData(res.data)
}

).catch(err => {

})
}

  render() {
    return (
      <div className="App">
        <NavComp />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(null, {getUserData})(App));
// export default App