import React, { useState } from 'react';

import {
  Button,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap';

import OrderSummary from './OrderSummary';


// Shipping Address modal component to display a form to add address and contact detail
const ShippingAddress = (props) => {
  const [name, setName] = useState("14 Roadland Avenue");
  const [street, setStreet] = useState("Apt 43");
  const [city, setCity] = useState("Kathmandu");
  const [state, setState] = useState("State 3");
  const [zipCode, setZipCode] = useState("44700");

  const [mobile, setMobile] = useState("9811000000");
  const [email, setEmail] = useState("ilovepizza@gmail.com");

  const { show, onHide, prices, orderCreate } = props


  const onConfirmOrder = () => {
    let statusValues = ["DELIVERED", "DELIVERED", "DELIVERED", "DELIVERED", "CANCELLED", "PENDING"]
    let statusIndex = Math.floor((Math.random() * 6) + 1);

    const data = {
      delivery_address: {
        name: name,
        street: street,
        city: city,
        state: state,
        zip_code: zipCode
      },
      contact_detail: {
        mobile: mobile,
        email: email
      },
      total_price: prices.total_usd,
      status: statusValues[statusIndex]
    }

    orderCreate(data)
    onHide()
  }


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <h5>Shipping Address and Contact</h5>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={7}>
            <Form>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control value={name} placeholder="1234 Main St" onChange={(e => setName(e.target.value))} />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control value={street} placeholder="Apartment, studio, or floor" onChange={(e => setStreet(e.target.value))} />
              </Form.Group>


              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control value={city} onChange={(e => setCity(e.target.value))} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" value={state} onChange={(e => setState(e.target.value))}>
                    <option value="State 1">State 1</option>
                    <option value="State 2">State 2</option>
                    <option value="State 3">State 3</option>
                    <option value="State 4">State 5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control value={zipCode} onChange={(e => setZipCode(e.target.value))} />
                </Form.Group>
              </Form.Row>

              <hr />
              <Form.Row>
                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile</Form.Label>
                    <Form.Control value={mobile} type="text" placeholder="Enter Mobile" onChange={(e => setMobile(e.target.value))} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email (Optional)</Form.Label>
                  <Form.Control value={email} type="email" placeholder="Enter email"onChange={(e => setEmail(e.target.value))} onChange={(e => setStreet(e.target.value))} />
                </Form.Group>
              </Form.Row>

            </Form>
          </Col>
          <Col sm={5}>
            <OrderSummary
              prices={prices}
              onConfirmOrder={onConfirmOrder}
              />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}


export default ShippingAddress
