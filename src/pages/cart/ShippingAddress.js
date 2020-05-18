import React from 'react';

import {
  Button,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap';

import OrderSummary from './OrderSummary';



const ShippingAddress = (props) => {
  const { show, onHide } = props

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
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>


              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" value="Choose...">
                    <option>State 1</option>
                    <option>State 2</option>
                    <option>State 3</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>

              <hr />
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile" />
                </Form.Group>
              </Form.Row>

            </Form>
          </Col>
          <Col sm={5}>
            <OrderSummary
              subTotal={250}
              deliveryCharge={50}
              total={300}
              />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}


export default ShippingAddress
