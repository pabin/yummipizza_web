import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Card,
  Badge,
} from 'react-bootstrap';

import { Redirect } from 'react-router-dom';

import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Rating from '../components/Rating'

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
      successMessage: "Added Successfully",
      failureMessage: ""
    }

  }

  // Create new cart if no cart is present else update items to valid cart
  onAddToCart = () => {
    const { item } = this.props

    const { authentication: {
      userAuthenticated,
      token,
      user,
    }} = this.props

    if (userAuthenticated) {

      this.setState({loading: true})
      if (user.valid_cart) {
        const if_exist = user.valid_cart.cart_items.filter(cart_item => cart_item.item.id === item.id)

        // Check if newly added item is in cart
        if (if_exist.length > 0) {
          this.setState({failureMessage: "Already in Cart!"})
          this.failureMessageAlert()
          this.setState({loading: false})
        } else {

          const cart_item = {
            item_id: item.id,
            quantity: 1,
            size: "LARGE"
          }

          let data = {cart_item: cart_item}
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
        }

      } else {
        const data = {
          cart_item: {
           "item_id": item.id,
           "quantity": 1,
           "size": "LARGE"
           }
        }

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
            className="pointer-cursor"
            style={{height: '10rem', width: 'auto'}}
            onClick={() => {this.setState({redirect: true})}}
            variant="top"
            src={item.item_image} />
          <Card.Body style={{padding: '10px'}}>
            <span onClick={() => {this.setState({redirect: true})}} className="pointer-cursor">
              {item.name}
              <div style={{display: 'flex'}}>
                <Rating size={13} rating={parseInt(item.ratings_value.average_rating)} />
                <span style={{fontSize: '11px', color: '#707B7C', marginLeft: '4px', marginTop: '6px'}}>{item.ratings_value.total_ratings} Ratings | {item.reviews_count} Reviews</span>
              </div>
            </span>
            <h4 style={{color: 'orange', fontWeight: 'bold'}}>${item.ls_price}</h4>

            {
              item.discount ?
              <span style={{fontSize: '14px', color: '#707B7C', marginRight: '10px', marginTop: '0px'}}>
                <del>$ {(item.ls_price + ((item.discount.discount_percent / 100) * item.ls_price)).toFixed(1)}</del>
              </span>
              : null
            }

            {
              item.discount ?
              item.discount.code === 'SPECIAL' ?
              <Badge variant="secondary">{item.discount.name}</Badge>
              : item.discount.code === 'LOYALTY' ?
              <Badge variant="dark">{item.discount.name}</Badge>
              : item.discount.code === 'HOLIDAY' ?
              <Badge variant="light">{item.discount.name}</Badge>
              : item.discount.code === 'STAYHOME' ?
              <Badge variant="warning">{item.discount.name}</Badge>
              : null
              : null
            }

          </Card.Body>
          <Button
            onClick={this.onAddToCart}
            style={{margin: "10px", width: '13rem', alignSelf: 'center'}}
            variant="info" block>
            {
              loading ?
              <Spinner size={25} />
              : null
            }
            Add to Cart
          </Button>

          <Message
            successMessage={this.state.successMessage}
            failureMessage={this.state.failureMessage}
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
