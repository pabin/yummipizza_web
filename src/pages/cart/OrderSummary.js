import React from 'react';

import {
  Button,
  Row,
  Col,
  Form,
} from 'react-bootstrap';

import './Cart.css';


const OrderSummary = (props) => {
  const { subTotal, deliveryCharge, total, proceedToAddress, fromCart } = props

  return (
    <div style={{padding: '10px 20px 10px 20px'}}>
      <h5>Order Summary</h5>
      <hr />
      <Row>
        <Col sm={6}>
          <p className="title">Chargable</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-center">
          <p className="title">Euro</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-center">
          <p className="title">USD</p>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <p className="title">Subtotal</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>€ {subTotal.toFixed(2)}</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>$ {subTotal.toFixed(2)}</p>
        </Col>
        <Col sm={6}>
          <p className="title">Delivery Charges</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>€ {deliveryCharge.toFixed(2)}</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>$ {deliveryCharge.toFixed(2)}</p>
        </Col>

        <Col sm={12} className="d-flex justify-content-center">
          <Form.Control type="text" placeholder="Enter Coupon Coide" className="mr-sm-2" />
          <Button variant="success">Apply</Button>
        </Col>

        <Col sm={6} style={{margin: '15px 0px 10px 0px'}}>
          <h6>Total</h6>
        </Col>
        <Col sm={3} className="d-flex justify-content-end" style={{margin: '15px 0px 10px 0px'}}>
          <h6>€ {total.toFixed(2)}</h6>
        </Col>
        <Col sm={3} className="d-flex justify-content-end" style={{margin: '15px 0px 10px 0px'}}>
          <h6>$ {total.toFixed(2)}</h6>
        </Col>
      </Row>

      <Row className="d-flex justify-content-end">
        <Col>
          {
            fromCart ?
            <Button onClick={proceedToAddress} variant="primary" block>Process to Shipping Address</Button>
            :
            <Button onClick={proceedToAddress} variant="primary" block>Confirm Order</Button>
          }
        </Col>
      </Row>
    </div>
  );
}


export default OrderSummary
