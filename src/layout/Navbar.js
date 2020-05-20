import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './Navbar.css'
import logo from '../assets/logo/logo_cropped.png';
import FullScreenLoading from '../components/FullScreenLoading'
import { USER_AUTHENTICATION_LOGOUT } from '../store/reducers/AuthenticationReducers';


const NavBar = (props) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const { authentication: {
    userAuthenticated,
    user,
  }} = props

  const { onLoginPress } = props

  const handleLogout = () => {
    setLoading(true)
    props.onUserLogout()
    localStorage.clear();
    history.push('/');

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

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
        <FormControl style={{"width": "60%"}} type="text" placeholder="Search Yummi Pizza..." className="mr-sm-2" />
        <Button className="button">Search</Button>
      </Form>

      <Navbar className="icon-wrapper">
        {
          user.valid_cart && user.valid_cart.cart_items.length > 0 ?
          <Link to={'/cart'} className="cart-link">
            <i className="fa fa-shopping-cart" style={{fontSize: "40px"}}></i>
            <span className="badge cartbadge">{user.valid_cart.cart_items.length}</span>
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
            <i onClick={handleLogout} className="fa fa-sign-out" style={{fontSize: "25px"}}></i>
          </Nav.Link>

        </Navbar>
        :
        <Nav.Link onClick={onLoginPress} className="cart-link">Login</Nav.Link>
      }
      </Navbar.Collapse>
      <FullScreenLoading show={loading} message="Logging Out..." />
    </Navbar>
  );
}



const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = dispatch => ({
  onUserLogout: () => dispatch({type: USER_AUTHENTICATION_LOGOUT}),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
