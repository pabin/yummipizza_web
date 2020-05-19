import React, { Component } from 'react';

import {
  Button,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap';

import logo from '../../assets/logo/logo_cropped.png';


// Signup modal component to show, signup form when user has no account
class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "ilovepizza",
      password: "ilovepizza",
    }

  }

  render() {
    const { show, onHide } = this.props
    // <Modal.Header closeButton>
    //   <Modal.Title>Login Before Shopping</Modal.Title>
    // </Modal.Header>

    return (
      <Modal show={show} onHide={onHide}>
        <div style={{padding: '15px'}}>
          <Modal.Header closeButton>
            <h5>Create Yummi Pizza account</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={logo}
                style={{padding: '20px', marginBottom: '30px'}}
                width="70%"
                height="auto"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            </div>

            <Form>
              <Form.Group controlId="formBasicUsername">
                <Row>
                  <Col sm={4}>
                    <Form.Label>Username</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Username" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Row>
                  <Col sm={4}>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Row>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit" block>SignUp</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}



export default Signup
