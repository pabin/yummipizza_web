import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Cart.css';
import QuantityCalculator from '../../components/QuantityCalculator';
import ShippingAddress from './ShippingAddress';
import RemoveWarning from './RemoveWarning';
import OrderSummary from './OrderSummary';

import Spinner from '../../components/Spinner';
import Message from '../../components/Message'

import { orderCreateAPI } from '../../api/OrderAPIs';
import { userAuthenticationSuccess } from '../../store/actions/AuthenticationActions';


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
    }

  }

  orderCreate = (data) => {
    const { authentication: {
      userAuthenticated,
      token,
      user,
    }} = this.props

    let order_items = []
    user.valid_cart.items_list.map(item => {
      order_items.push({
        item_id: item.id,
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

        this.props.updateUserDetail(token, user)
        this.showingLoading(this.successMessageAlert)


      } else if (response.error) {
        // log error
        this.showingLoading(this.failureMessageAlert)

      }
    })
  }

  showingLoading = (messageAlert) => {
    setTimeout(() => {
      messageAlert()
    }, 1500);
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

  loading = () => {
    return (
      <Modal
          size="sm"
          show={this.state.loading}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Body>
            <div className="d-flex align-items-center justify-content-center">
              <h5 style={{paddingTop: '40px'}}></h5>
              <Spinner size={50} />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <h5  style={{paddingTop: '15px'}}>Creating Order...</h5>
            </div>

          </Modal.Body>
        </Modal>
    );
  }


  handleRemoveWarningShow = () => {
    this.setState({showRemoveWarningModal: true})
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


  render() {
    const { itemList: {
      itemListFetched,
      itemList,
    }} = this.props

    const { authentication: {
      user,
    }} = this.props

    const { showRemoveWarningModal, showShippingAddressModal, showSuccessMessage, showFailureMessage } = this.state

    let prices = {}
    let totalPrice = 0
    if (user.valid_cart) {
        user.valid_cart.items_list.map(item => {
          totalPrice += item.ls_price
        })
    }

    prices.sub_total_euro = totalPrice * 0.92
    prices.sub_total_usd = totalPrice
    prices.delivery_euro = 10 * 0.92
    prices.delivery_usd = 10
    prices.total_euro = (totalPrice + 10) * 0.92
    prices.total_usd = totalPrice + 10

    return (
      <div className="cart-container">
        <Row className="cart-row">

        {
          user.valid_cart && user.valid_cart.items_list.length > 0 ?
            <Col sm={8}>
              <Row>
                {
                  user.valid_cart.items_list.map((item, index) => (
                    <Col sm={12} className="cart-item" key={index}>
                      <Row>
                        <Col sm={2}>
                          <img
                            style={{marginRight: "10px", borderRadius: '5px'}}
                            src={item.item_image}
                            width="100%"
                            height="auto"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                            />
                        </Col>

                        <Col sm={4}>
                          <h5>{item.name}</h5>
                          <p className="title">Size: {item.size}</p>
                        </Col>

                        <Col sm={2}>
                          <p className="title">Price</p>
                          <h4 style={{color: 'orange'}}>$ {item.ls_price}</h4>
                        </Col>

                        <Col sm={2}>
                          <p className="title">Quantity</p>
                          <QuantityCalculator
                            key={index}
                            item={item}
                            />
                        </Col>

                        <Col sm={2} className="d-flex align-items-center justify-content-center">
                          <i onClick={this.handleRemoveWarningShow} className="fa fa-trash fa-2x delete-icon"></i>
                        </Col>

                      </Row>
                    </Col>
                  ))
                }
              </Row>
            </Col>
            :
            <Col sm={12}>
              <Row>
                <Col sm={12} className="cart-item">
                  <h5>Your cart is Empty</h5>
                  <p>
                    Go Shpping
                  </p>
                </Col>
              </Row>
            </Col>
          }

          {
            user.valid_cart && user.valid_cart.items_list.length > 0 ?
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
        />

        <ShippingAddress
          show={showShippingAddressModal}
          prices={prices}
          onHide={this.handleProceedOrderClose}
          orderCreate={this.orderCreate}
        />

      {this.loading()}

      <Message showSuccessMessage={showSuccessMessage} showFailureMessage={showFailureMessage} />

      </div>
    );
  }
}

const mapStateToProps  = state => ({
  itemList: state.itemList,
  authentication: state.authentication
})

const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
