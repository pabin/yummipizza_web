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
import { itemListFetchSuccess } from '../store/actions/ItemListActions';


const NavBar = (props) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const history = useHistory();

  const { authentication: {
    userAuthenticated,
    user,
  }} = props

  const { itemList: {
    itemListFetched,
    itemList,
    backupItemList,
  }} = props

  const { onLoginPress, onItemFilter } = props

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
      backupItemList.map(item => {
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
          alt="React Bootstrap logo"
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
          placeholder="Search Yummi Pizza..."
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
        <Nav.Link onClick={onLoginPress} className="cart-link">Login</Nav.Link>
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
  onItemFilter: (itemList, backupItemList) => dispatch(itemListFetchSuccess(itemList, backupItemList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
