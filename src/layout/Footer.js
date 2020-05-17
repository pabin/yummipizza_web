import React, { Component } from 'react';

import {
  Container,
  Row,
  Col
} from 'react-bootstrap';



class Footer extends Component {


  render() {

    var style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        padding: "20px",
        left: "0",
        bottom: "0",
        width: "100%",
    }


    return (
      <div style={style}>
        <Container>
          <Row>
            <Col sm={3}>
              <h3>Customer Care</h3>
              <p>Phone</p>
              <p>Email</p>
              <p>Direct</p>
            </Col>
            <Col sm={3}>
              <h3>Contact</h3>
              <p>About us</p>
              <p>Contact</p>
            </Col>
            <Col sm={6}>
              <h3>Payment Methods</h3>
              <p>Ebanking</p>
              <p>Ewallet</p>
              <p>Master Cards</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}



export default Footer
