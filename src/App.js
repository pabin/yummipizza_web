import React, { Component, Suspense } from 'react';

import './App.css';

import NavBar from './layout/Navbar';
import Routes from "./routes/index";
import Footer from "./layout/Footer";

import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLoginForm: false,
      showSingupForm: false,
    }
  }

    onLoginPress = () => {
      this.setState({showLoginForm: true})
    }

    onLoginClose = () => {
      this.setState({showLoginForm: false})
    }


    onSignupPress = () => {
      console.log('singup now...');
      this.setState({showLoginForm: false, showSingupForm: true})
    }

    onSignupClose = () => {
      this.setState({showSingupForm: false})
    }

    render() {
      const { showLoginForm, showSingupForm } = this.state

      return (
          <div className="App">
            <NavBar onLoginPress={this.onLoginPress}  />
            <div style={{paddingTop: "70px"}}>
              <Routes onLoginPress={this.onLoginPress} />
            </div>
            <Footer />

            <Login show={showLoginForm} onHide={this.onLoginClose} onSignupPress={this.onSignupPress}/>
            <Signup show={showSingupForm} onHide={this.onSignupClose} />
          </div>
      );
    }
}

export default App;
