import React from 'react';
import { connect } from 'react-redux';

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from '../assets/logo/logo_cropped.png';
import { userAuthenticationFailure } from '../store/actions/AuthenticationActions';


// Navbar component to render site Navbar
class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // showLoginForm: false,
      // showSingupForm: false,
    }

  }

  handleLogout() {
    console.log('loggout');
    // this.props.onReduxLogout("Error")
    // localStorage.clear();
    // this.props.history.push("/");
  }


  render() {
    // const user = JSON.parse(localStorage.getItem('user'))
    // const userAuthenticated = localStorage.getItem('userAuthenticated')

    const { authentication: {
      userAuthenticated,
      user,
    }} = this.props

    const { onLoginPress } = this.props

    return (
      <Navbar fixed="top" className="custom-navbar" expand="lg">
        <Navbar.Brand className="d-flex justify-content-center" as={Link} to="/" style={{width: "260px", marginRight: '70px'}}>
          <img
            src={logo}
            width="90%"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center">

        <Form className="form" inline>
          <FormControl style={{"width": "50%"}} type="text" placeholder="Search Yummi Pizza..." className="mr-sm-2" />
          <Button className="button">Search</Button>
        </Form>

        <Navbar className="icon-wrapper">
          {
            user.valid_cart && user.valid_cart.items_list.length > 0 ?
            <Link to={'/cart'} className="cart-link">
              <i className="fa fa-shopping-cart" style={{fontSize: "40px"}}></i>
              <span className="badge cartbadge">{user.valid_cart.items_list.length}</span>
            </Link>
            :
            <Link to={'/cart'} className="cart-link">
              <i className="fa fa-shopping-cart" style={{fontSize: "40px"}}></i>
            </Link>
          }
        </Navbar>

        {
          userAuthenticated ?
          <Navbar>
            <Nav.Link as={Link} to={'/orders'} className="cart-link">Orders</Nav.Link>
            <Nav.Link className="cart-link">{user.username}</Nav.Link>
            <Nav.Link className="cart-link">
              <i onClick={this.handleLogout} className="fa fa-sign-out" style={{fontSize: "25px"}}></i>
            </Nav.Link>

          </Navbar>
          :
          <Nav.Link onClick={onLoginPress} className="cart-link">Login</Nav.Link>
        }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  onReduxLogout: (error) => userAuthenticationFailure(error),
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

// export default NavBar
