import React from 'react';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './Navbar.css'
import logo from '../assets/logo/logo_cropped.png';
import cart from '../assets/icons/cart.png';



class NavBar extends React.Component {

  render() {

    return (
      <div>
        <Nav className="justify-content-end custom-nav" activeKey="/home">
          <Nav.Item>
            <Nav.Link as={Link} to="/orders">ORDERS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/items">ITEMS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={'/login'}>LOGIN</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={'/register'}>SIGNUP</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="navbar-container">
          <Navbar className="custom-navbar" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="40%"
                height="auto"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-center">

              <Form className="form" inline>
                <FormControl style={{"width": "70%", "backgroundColor": "#EFEFEF"}} type="text" placeholder="Search Yummi Pizzas" className="mr-sm-2" />
                <Button className="button">Search</Button>
              </Form>

              <div class="icon-wrapper">
                  <Link to={'/cart'} className="cart-link">
                    <i class="fa fa-shopping-cart fa-3x"></i>
                    <span class="badge">1</span>
                  </Link>
              </div>

            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}


export default NavBar
