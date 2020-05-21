import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';

import './Cart.css';
import QuantityCalculator from '../../components/QuantityCalculator';
import ShippingAddress from './ShippingAddress';
import RemoveWarning from './RemoveWarning';
import OrderSummary from './OrderSummary';

import Message from '../../components/Message'
import FullScreenLoading from '../../components/FullScreenLoading'

import { orderCreateAPI } from '../../api/OrderAPIs';
import { shoppingCartItemUpdateAPI, cartItemDeleteAPI } from '../../api/CartAPIs';
import { userAuthenticationSuccess } from '../../store/actions/AuthenticationActions';


// List out all the items in cart and proceed to address fill and confirm order
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
      showRemoveWarningModal: false,
      showShippingAddressModal: false,
      loading: false,
      showSuccessMessage: false,
      showFailureMessage: false,
      itemToDelete: "",
    }

  }


  // Create order from user input data, and make user cart inactive
  orderCreate = (data) => {
    const { authentication: {
      token,
      user,
    }} = this.props

    let order_items = []
    user.valid_cart.cart_items.map(item => {
      order_items.push({
        item_id: item.item.id,
        quantity: item.quantity,
        size: item.size
      })
    })

    data.order_items = order_items

    this.setState({loading: true})
    orderCreateAPI(data)
    .then(response => {
      if (response.data) {
        // log success
        const user = response.data
        this.showingLoading(this.successMessageAlert)
        localStorage.setItem('user', JSON.stringify(user))
        this.props.updateUserDetail(token, user)


      } else if (response.error) {
        this.showingLoading(this.failureMessageAlert)
      }
    })
  }

  // Displays loading screen for 1.5 second
  showingLoading = (messageAlert) => {
    setTimeout(() => {
      messageAlert()
    }, 1000);
  }

  // Displays success message for 1 seconds
  successMessageAlert = () => {
    this.setState({loading: false});
    this.setState({showSuccessMessage: true})
    setTimeout(() => {
      this.redirectToHome()
    }, 1000);
  }

  // Displays error message for 1 seconds
  failureMessageAlert = () => {
    this.setState({loading: false});
    this.setState({showFailureMessage: true})
    setTimeout(() => {
      this.setState({showFailureMessage: false})
    }, 1000);
  }

  redirectToHome = () => {
    this.setState({showSuccessMessage: false})
    this.props.history.push("/");
  }

  handleRemoveWarningShow = (item_id) => {
    this.setState({showRemoveWarningModal: true, itemToDelete: item_id})
  }

  handleRemoveWarningClose = () => {
    this.setState({showRemoveWarningModal: false})
  }

  handleProceedOrderShow = () => {
    this.setState({showShippingAddressModal: true})
  }

  handleProceedOrderClose = () => {
    this.setState({showShippingAddressModal: false})
  }


  // Increase the quantity of the cart item globally
  increaseQuantity = (item) => {
    const data = {
      item_id: item.item.id,
      size: item.size,
      quantity:  item.quantity > 8 ? 9 : item.quantity+1
    }
    this.cartItemUpdate(data, item.id)
  }

  // Decrease the quantity of the cart item globally
  decreaseQuantity = (item) => {
    const data = {
      item_id: item.item.id,
      size: item.size,
      quantity: item.quantity > 1 ? item.quantity - 1 : 1
    }
    this.cartItemUpdate(data, item.id)
  }


  // Update item size of the cart item globally
  oneItemSizeChange = (size, item) => {
    const data = {
      item_id: item.item.id,
      size: size,
      quantity: item.quantity
    }
    this.cartItemUpdate(data, item.id)
  }


  // Updates the cart item
  cartItemUpdate = (data, cart_item_id) => {
    const { authentication: {
      token,
      user,
    }} = this.props

    shoppingCartItemUpdateAPI(data, cart_item_id)
    .then(response => {
      if (response.data) {
        const cartItemResponse = response.data

        user.valid_cart.cart_items.map(cartitem => {
          if (cartitem.id === cartItemResponse.id) {
            cartitem.id = cartItemResponse.id
            cartitem.quantity = cartItemResponse.quantity
            cartitem.size = cartItemResponse.size
            cartitem.item = cartItemResponse.item
          }
        })

        this.props.updateUserDetail(token, user)
        localStorage.setItem('user', JSON.stringify(user))

      } else if (response.error) {
        // log error
      }
    })
  }


  // Deelted the cart item
  onConfirmDelete = () => {
    const { authentication: {
      token,
      user,
    }} = this.props

    cartItemDeleteAPI(this.state.itemToDelete)
    .then(response => {
      if (response.data) {

        let filteredCartItems = user.valid_cart.cart_items.filter(cartitm => cartitm.id != this.state.itemToDelete)
        user.valid_cart.cart_items = filteredCartItems

        this.setState({showRemoveWarningModal: false})
        this.props.updateUserDetail(token, user)
        localStorage.setItem('user', JSON.stringify(user))
      } else if (response.error) {
        this.setState({showRemoveWarningModal: false})
      }
    })
  }


  render() {
    const { authentication: {
      user,
    }} = this.props

    const { showRemoveWarningModal, showShippingAddressModal, showSuccessMessage, showFailureMessage, loading } = this.state

    let prices = {}
    let totalPrice = 0
    if (user.valid_cart) {
        user.valid_cart.cart_items.map(item => {
          if (item.size === "LARGE") {
            totalPrice += item.item.ls_price * item.quantity
          } else if (item.size === "MEDIUM") {
            totalPrice += item.item.ms_price * item.quantity
          }
        })
    }

    prices.sub_total_euro = totalPrice * 0.92  // 0.92 conversion rate
    prices.sub_total_usd = totalPrice
    prices.delivery_euro = 10 * 0.92  // Standard delivery charge $10
    prices.delivery_usd = 10
    prices.total_euro = (totalPrice + 10) * 0.92
    prices.total_usd = totalPrice + 10

    const time_now = new Date()

    return (
      <div className="cart-container">
        <Row className="cart-row">

        {
          user.valid_cart && user.valid_cart.cart_items.length > 0 ?
            <Col sm={8}>
              <Row>
                <Col sm={12} className="cart-item d-flex align-items-center" style={{padding: "10px"}}>
                  <div className="d-flex">
                    <i className="fa fa-shopping-cart" style={{fontSize: "30px", marginLeft: '10px', marginRight: "20px"}}></i>
                    <h5 style={{paddingTop: '5px'}}>{user.valid_cart.cart_items.length} Item(s) in Your Cart</h5>
                    {/*
                      <span style={{fontSize: '16px', color: '#707B7C', marginLeft: '20px', paddingTop: '5px'}}>Your cart will expire in {parseInt(((new Date(user.valid_cart.validity)).getTime() - time_now.getTime())/60000)} minutes</span>
                    */}
                  </div>

                </Col>
                {
                  user.valid_cart.cart_items.map((item, index) => (
                    <Col sm={12} className="cart-item" key={index}>
                      <Row>
                        <Col sm={2}>
                          <img
                            style={{marginRight: "10px", borderRadius: '5px'}}
                            src={item.item.item_image}
                            width="100%"
                            height="auto"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                            />
                        </Col>

                        <Col sm={4}>
                          <h5>{item.item.name}</h5>

                          <Form inline>
                            <Form.Check
                              style={{marginRight: '10px'}}
                              custom
                              type="radio"
                              id={`medium_size${item.id}`}
                              name={`size_radio${item.id}`}
                              label="Medium"
                              checked={item.size === "MEDIUM" ? true : false}
                              onChange={() => this.oneItemSizeChange("MEDIUM", item)}
                              />
                            <Form.Check
                              custom
                              type="radio"
                              id={`large_size${item.id}`}
                              name={`size_radio${item.id}`}
                              label="Large"
                              checked={item.size === "LARGE" ? true : false}
                              onChange={() => this.oneItemSizeChange("LARGE", item)}
                              />
                          </Form>
                        </Col>

                        <Col sm={2}>
                          <span className="cart-item-title">Price</span>
                          {
                            item.size === "LARGE" ?
                            <h4 style={{color: 'orange'}}>${item.item.ls_price}</h4>
                            :
                            <h4 style={{color: 'orange'}}>${item.item.ms_price}</h4>
                          }
                        </Col>

                        <Col sm={2}>
                          <span className="cart-item-title">Quantity</span>
                          <QuantityCalculator
                            item={item}
                            quantity={item.quantity}
                            increaseQuantity={this.increaseQuantity}
                            decreaseQuantity={this.decreaseQuantity}
                            />
                        </Col>

                        <Col sm={2} className="d-flex align-items-center justify-content-center">
                          <i onClick={() => this.handleRemoveWarningShow(item.id)} className="fa fa-trash fa-2x delete-icon"></i>
                        </Col>

                      </Row>
                    </Col>
                  ))
                }
              </Row>
            </Col>
            :
            <Col sm={12} className="cart-item d-flex align-items-center justify-content-center" style={{minHeight: "500px", flexDirection: 'column'}}>
              <h5 align="center"><i className="fa fa-exclamation-circle fa-3x"></i></h5>
              <h5 align="center">Your cart is Empty</h5>
              <br/>
              <Button
                onClick={() => this.props.history.push("/")}
                style={{alignSelf: 'center'}}
                variant="secondary" >
                Continue Shoping
              </Button>

            </Col>
          }

          {
            user.valid_cart && user.valid_cart.cart_items.length > 0 ?
            <Col sm={4}>
              <Row>
                <Col sm={12} className="summary">
                  <OrderSummary
                    prices={prices}
                    proceedToAddress={this.handleProceedOrderShow}
                    fromCart={true}
                    />
                </Col>
              </Row>
            </Col>
            : null
          }
        </Row>

        <RemoveWarning
          show={showRemoveWarningModal}
          onHide={this.handleRemoveWarningClose}
          onConfirmDelete={this.onConfirmDelete}
        />

        <ShippingAddress
          show={showShippingAddressModal}
          prices={prices}
          onHide={this.handleProceedOrderClose}
          orderCreate={this.orderCreate}
        />

      <FullScreenLoading show={loading} message="Creating Order..." />
      <Message
        successMessage="Order Create Success"
        showSuccessMessage={showSuccessMessage}
        showFailureMessage={showFailureMessage} />

      </div>
    );
  }
}

const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
