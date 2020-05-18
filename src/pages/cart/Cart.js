import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';

import './Cart.css';
import QuantityCalculator from '../../components/QuantityCalculator';


class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
      quantity: 1,
      showDeleteWarning: false,
    }

  }

  handleDeleteWarningShow = () => {
    this.setState({showDeleteWarning: true})
  }

  handleDeleteWarningClose = () => {
    this.setState({showDeleteWarning: false})
  }

  render() {

    const { itemList: {
      itemListFetched,
      itemList,
    }} = this.props

    const { quantity, showDeleteWarning } = this.state

    let myItems = [];
    if (itemListFetched) {
        myItems.push(itemList.results[0])
        myItems.push(itemList.results[1])
        myItems.push(itemList.results[2])
    }

    return (
      <div className="cart-container">
        <Row className="cart-row">

          <Col sm={8}>
            <Row>
              {
                myItems.map((item, index) => (
                  <Col sm={12} className="cart-item">
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
                        <p className="title">Size: Large</p>
                      </Col>

                      <Col sm={2}>
                        <p className="title">Price</p>
                        <h4 style={{color: 'orange'}}>$ {item.ls_price}</h4>
                      </Col>

                      <Col sm={2}>
                        <p className="title">Quantity</p>
                        <QuantityCalculator
                          quantity={quantity}
                          onChange={(event) => this.setState({quantity: event.target.value})}
                          onIncrease={() => this.setState(quantity > 9 ?{ quantity: 10} : {quantity: quantity + 1})}
                          onDecrease={() => this.setState(quantity > 1 ? { quantity: quantity - 1} : {quantity: 1})}
                          />
                      </Col>

                      <Col sm={2} className="d-flex align-items-center justify-content-center">
                        <i onClick={this.handleDeleteWarningShow} class="fa fa-trash fa-2x delete-icon"></i>
                      </Col>

                    </Row>
                  </Col>
                ))
              }

              {
                myItems.length === 0 ?
                <Col sm={12} className="cart-item">
                  <h5>Your cart is Empty</h5>
                  <p>
                    Go Shpping
                  </p>
                </Col>
                : null
              }

            </Row>
          </Col>

          <Col sm={4}>
            <Row>

              <Col sm={12} className="summary">
                <h5>Order Summary 1</h5>
                <p>Subtotal    $120</p>
                <p>Delivery Charges    $10</p>
                <p>Total    $130</p>
                <Button onClick={this.onAddToCart} variant="primary" block>Confirm Order</Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Modal show={showDeleteWarning} onHide={this.handleDeleteWarningClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Item Remove</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading removing this item!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteWarningClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.handleDeleteWarningClose}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}

const mapStateToProps  = state => ({
  itemList: state.itemList
})

export default connect(mapStateToProps)(Cart)
