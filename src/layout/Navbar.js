import React from 'react';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';


class NavBar extends React.Component {

  render() {

    return (
      <div className="App">

        <Nav className="justify-content-end custom-nav" activeKey="/home">
          <Nav.Item>
            <Nav.Link><Link to={'/'}>HOME</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to={'/items'}>ITEMS</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to={'/orders'}>ORDERS</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to={'/login'}>LOGIN</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to={'/register'}>SIGNUP</Link></Nav.Link>
          </Nav.Item>
        </Nav>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">The Yummi Pizza</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </Navbar>

      </div>
    );
  }
}


export default NavBar
