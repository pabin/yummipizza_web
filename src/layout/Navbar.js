import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'

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
import { itemListFetchSuccess } from '../store/actions/ItemListActions';
import { userAuthenticationSuccess } from '../store/actions/AuthenticationActions';


const NavBar = (props) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [validityCheckTime, setValidityCheckTime] = useState(0)
  const history = useHistory();
  const location = useLocation();

  let searchText;
  if (location.pathname === '/careers') {
    searchText = 'Search Yummi Careers... ';
  }

  const { authentication: {
    userAuthenticated,
    token,
    user,
  }} = props

  const { itemList: {
    itemListFetched,
    itemList,
    backupItemList,
  }} = props

  const { onLoginPress, onItemFilter } = props

  const checkIfCartIsValid = () => {
    if (user.valid_cart) {
      const time_now = new Date()
      if (!(time_now < new Date(user.valid_cart.validity))) {
        console.log('cart validity expired');
        user.valid_cart = null
        props.updateUserDetail(token, user)
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  }

  // Check every 10 second if cart is valid
  setTimeout(() => {
    setValidityCheckTime(validityCheckTime+1)
    checkIfCartIsValid()
  }, 60000);


  // Handles user logout, clears localstorage and redux store
  const handleLogout = () => {
    setLoading(true)
    props.onUserLogout()
    localStorage.clear();
    history.push('/');

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }


  // Handles item search
  const handleItemSearch = (search_term) => {
    if (itemListFetched) {
      console.log('search_term', search_term);
      let filteredItems = []
      backupItemList.forEach(item => {
        if (item.name.toLowerCase().includes(search_term.toLowerCase())) filteredItems.push(item);
      })

      itemList.results = search_term ? filteredItems: backupItemList
      onItemFilter(itemList, backupItemList)
    }
  }


  return (
    <Navbar fixed="top" className="custom-navbar" expand="lg">
      <Navbar.Brand className="d-flex justify-content-center" as={Link} to="/" style={{width: "260px", marginRight: '70px'}}>
        <img
          src={logo}
          width="90%"
          height="auto"
          className="d-inline-block align-top"
          alt="Site Logo"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-center">

      <Form className="form" inline>
        <FormControl
          onChange={(e) => (
             setSearchTerm(e.target.value),
             handleItemSearch(e.target.value)
          )}
          style={{"width": "60%"}}
          type="text"
          placeholder={ searchText ? searchText : 'Search Yummi Pizza...'}
          className="mr-sm-2" />
        <Button onClick={() => handleItemSearch(searchTerm)} variant="secondary">Search</Button>
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
        <>
          <Nav.Link onClick={onLoginPress} className="cart-link">Login</Nav.Link>
          <Nav.Link as={Link} to={'/careers'} className="cart-link">Careers</Nav.Link>
        </>
      }
      </Navbar.Collapse>
      <FullScreenLoading show={loading} message="Logging Out..." />
    </Navbar>
  );
}



const mapStateToProps  = state => ({
  authentication: state.authentication,
  itemList: state.itemList,
})

const mapDispatchToProps = dispatch => ({
  onUserLogout: () => dispatch({type: USER_AUTHENTICATION_LOGOUT}),
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
  onItemFilter: (itemList, backupItemList) => dispatch(itemListFetchSuccess(itemList, backupItemList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
