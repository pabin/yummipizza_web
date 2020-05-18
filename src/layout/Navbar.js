import React from 'react';

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from '../assets/logo/logo_cropped.png';

import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';


class NavBar extends React.Component {
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
    // <Nav.Link as={Link} to={'/login'}>LOGIN</Nav.Link>

    const { showLoginForm, showSingupForm } = this.state

    return (
      <Navbar fixed="top" className="custom-navbar" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30%"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center">

          <Form className="form" inline>
            <FormControl style={{"width": "60%", "backgroundColor": "#EFEFEF"}} type="text" placeholder="Search Yummi Pizzas" className="mr-sm-2" />
            <Button className="button">Search</Button>
          </Form>

          <div className="icon-wrapper">
              <Link to={'/cart'} className="cart-link">
                <i className="fa fa-shopping-cart fa-3x"></i>
                <span className="badge">1</span>
              </Link>
          </div>

          <Nav.Link onClick={this.onLoginPress} className="cart-link">Login</Nav.Link>

        </Navbar.Collapse>

        <Login show={showLoginForm} onHide={this.onLoginClose} onSignupPress={this.onSignupPress}/>
        <Signup show={showSingupForm} onHide={this.onSignupClose} />
      </Navbar>
    );
  }
}


export default NavBar
