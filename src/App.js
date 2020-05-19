import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import NavBar from './layout/Navbar';
import Routes from "./routes/index";
import Footer from "./layout/Footer";

import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import { userAuthenticationSuccess } from './store/actions/AuthenticationActions';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLoginForm: false,
      showSingupForm: false,
    }
    this.updateReduxAuthentication()
  }


  updateReduxAuthentication = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userAuthenticated = localStorage.getItem('userAuthenticated')
    const token = localStorage.getItem('token')
    console.log('userAuthenticated at appp', userAuthenticated);

    if (userAuthenticated) {
      this.props.updateUserDetail(token, user)
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
      const userAuthenticated = localStorage.getItem('userAuthenticated')

      return (
          <div className="App">
            <NavBar onLoginPress={this.onLoginPress}  />
            <div style={{paddingTop: "70px"}}>
              <Routes
                onLoginPress={this.onLoginPress}
                userAuthenticated={userAuthenticated} />
            </div>
            <Footer />

            <Login
              show={showLoginForm}
              onHide={this.onLoginClose}
              onSignupPress={this.onSignupPress}/>
            <Signup
              show={showSingupForm}
              onHide={this.onSignupClose} />
          </div>
      );
    }
}


const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(null, mapDispatchToProps)(App)
