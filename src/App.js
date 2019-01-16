import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavComp from './components/Nav/Nav'
import routes from './routes'
import Footer from './components/Footer/Footer';

class App extends Component {

// state = {
//   user: {}
// }

// updateUser(user) {
//   this.setState({
//     user
//   })
// }

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

export default App;
