import React, { useState } from 'react';

import {
  Button,
  Row,
  Col,
  Form,
  Alert,
} from 'react-bootstrap';

import './Cart.css';


// Order Summary component to show summary of a user order
const OrderSummary = (props) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponIsValid, setCouponIsValid] = useState(true);

  const { prices, proceedToAddress, fromCart, onConfirmOrder } = props

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
          <p>€{prices.sub_total_euro.toFixed(2)}</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>${prices.sub_total_usd.toFixed(2)}</p>
        </Col>
        <Col sm={6}>
          <p className="title">Delivery Charges</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>€{prices.delivery_euro.toFixed(2)}</p>
        </Col>
        <Col sm={3} className="d-flex justify-content-end">
          <p>${prices.delivery_usd.toFixed(2)}</p>
        </Col>

        {
          fromCart ?
          <div>
            <Col sm={12} className="d-flex justify-content-center">
              <Form.Control
                style={{"textTransform": "uppercase"}}
                value={couponCode} type="text"
                placeholder="Enter Coupon Code"
                className="mr-sm-2"
                onChange={(e => setCouponCode(e.target.value))}
                />
              <Button disabled={couponCode ? false : true} variant="success" onClick={() => setCouponIsValid(false)}>Apply</Button>
            </Col>
            <Col sm={12} style={{marginTop: '10px'}}>
              {
                !couponIsValid ?
                <Alert variant="danger" style={{padding: '5px', paddingLeft: '10px'}}>
                  Invalid Coupon Code
                </Alert>
                : null
              }
            </Col>
          </div>
          : null
        }

        <Col sm={6} style={{margin: '15px 0px 10px 0px'}}>
          <h6>Total</h6>
        </Col>
        <Col sm={3} className="d-flex justify-content-end" style={{margin: '15px 0px 10px 0px'}}>
          <h6>€{prices.total_euro.toFixed(2)}</h6>
        </Col>
        <Col sm={3} className="d-flex justify-content-end" style={{margin: '15px 0px 10px 0px'}}>
          <h6>${prices.total_usd.toFixed(2)}</h6>
        </Col>
      </Row>

      <Row className="d-flex justify-content-end">
        <Col>
          {
            fromCart ?
            <Button onClick={proceedToAddress} variant="primary" block>Proceed Order</Button>
            :
            <Button onClick={onConfirmOrder} variant="primary" block>Confirm Order</Button>
          }
        </Col>
      </Row>
    </div>
  );
}


export default OrderSummary
