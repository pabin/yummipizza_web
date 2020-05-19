import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Card,
} from 'react-bootstrap';

import { Redirect } from 'react-router-dom';

import Spinner from '../components/Spinner'
import Message from '../components/Message'

import { shoppingCartCreateAPI, shoppingCartUpdateAPI } from '../api/CartAPIs';
import { userAuthenticationSuccess } from '../store/actions/AuthenticationActions';


// Item card component to display basic details of a item in home page
class ItemCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
      loading: false,
      showSuccessMessage: false,
      showFailureMessage: false,
    }

  }

  // Create new cart if no cart is present else update items to valid cart
  onAddToCart = () => {
    const { item } = this.props
    // const user = JSON.parse(localStorage.getItem('user'))
    // const userAuthenticated = localStorage.getItem('userAuthenticated')
    // const token = localStorage.getItem('token')

    const { authentication: {
      userAuthenticated,
      token,
      user,
    }} = this.props

    if (userAuthenticated) {

      this.setState({loading: true})
      if (user.valid_cart) {
        console.log('yes have valid cart...');

        let items = []
        user.valid_cart.items_list.map(cartItem => {
          items.push(cartItem.id)
        })
        items.push(item.id)

        let data = {items: items}

        shoppingCartUpdateAPI(data, user.valid_cart.id)
        .then(response => {
          if (response.data) {
            user.valid_cart = response.data
            localStorage.setItem('user', JSON.stringify(user))
            this.props.updateUserDetail(token, user)

            this.successMessageAlert()
            this.setState({loading: false})

          } else if (response.error) {
            this.failureMessageAlert()
            this.setState({loading: false})
          }
        })
      } else {
        console.log('you dont have cart creating new one...');
        const data = {items: [item.id]}

        shoppingCartCreateAPI(data)
        .then(response => {
          if (response.data) {
            user.valid_cart = response.data
            localStorage.setItem('user', JSON.stringify(user))
            this.props.updateUserDetail(token, user)

            this.successMessageAlert()
            this.setState({loading: false})

          } else if (response.error) {
            this.failureMessageAlert()
            this.setState({loading: false})
          }
      })
    }
    } else {
      console.log('user is not authenticated, show login message');
      this.props.onLoginPress()
    }
  }


  // Displays success message for 1 seconds
  successMessageAlert = () => {
    this.setState({showSuccessMessage: true})
    setTimeout(() => {
      this.setState({showSuccessMessage: false})
    }, 1000);
  }

  // Displays error message for 1 seconds
  failureMessageAlert = () => {
    this.setState({showFailureMessage: true})
    setTimeout(() => {
      this.setState({showFailureMessage: false})
    }, 1000);
  }

  render() {
    // <p><del>$ {this.props.price + 5}</del>$5 off</p>

    const { item } = this.props
    const { showSuccessMessage, showFailureMessage, loading } = this.state

    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: '/item', state: { item: item } }} />
      )
    } else {
      return (
        <Card style={{ width: '14rem', height: '22rem', margin: '5px'}} className="item-card">
          <Card.Img
            style={{height: '10rem', width: 'auto'}}
            onClick={() => {this.setState({redirect: true})}}
            variant="top"
            src={item.item_image} />
          <Card.Body onClick={() => {this.setState({redirect: true})}}>
            <Card.Text>
              {item.name}
            </Card.Text>
            <Card.Title style={{color: 'orange'}}>$ {item.ls_price}</Card.Title>
          </Card.Body>
          <Button
            onClick={this.onAddToCart}
            style={{margin: "10px", width: '13rem', alignSelf: 'center'}}
            variant="primary" block>
            {
              loading ?
              <Spinner size={25} />
              : null
            }
            Add to Cart
          </Button>

          <Message
            successMessage="Added Successfully"
            showSuccessMessage={showSuccessMessage}
            showFailureMessage={showFailureMessage}  />

        </Card>
      );
    }
  }
}

const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard)
