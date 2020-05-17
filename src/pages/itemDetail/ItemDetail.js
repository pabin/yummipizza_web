import React from 'react';
// import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';


class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
    }

  }


  onAddToCart = () => {
    console.log('on add to cart...');
  }

  render() {
    const{ item } = this.props.location.state

    let containerStyle = {
      padding: "0px 30px 0px 30px",
      backgroundColor: '#DFDFDF',
      display: 'flex',
      flexDirection: "column"
    }

    let rowstyle = {
      backgroundColor: 'white',
      margin: '10px',
      padding: '20px',
    }

    let ratingRowStyle = {
      backgroundColor: 'white',
      margin: "10px 0px 10px 10px",
      padding: '20px',
    }

    let topSellerRowStyle = {
      backgroundColor: 'white',
      margin: "10px 10px 10px 0px",
      padding: '20px',
    }


    return (
      <div style={containerStyle}>
        <Row style={rowstyle}>
          <Col sm={5} className="d-flex align-items-center justify-content-center">
            <img
              style={{marginRight: "10px", borderRadius: '5px'}}
              src={item.item_image}
              width="100%"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Col>
          <Col sm={3}>
            <h5>{item.name}</h5>
            <h5>$ {item.ls_price}</h5>
            <h5>Size</h5>
            <p>Medium</p>
            <p>Large</p>

            <Button onClick={this.onAddToCart} variant="primary" block>Add to Cart</Button>

          </Col>
          <Col sm={3}>
            <h5>Delivery Address</h5>
            <h5>{item.name}</h5>
            <h5>$ {item.ls_price}</h5>
          </Col>
        </Row>

        <Row style={rowstyle}>
          <Col sm={5} className="d-flex align-items-center justify-content-center">
            <img
              style={{marginRight: "10px", borderRadius: '5px', margin: '10px'}}
              src={item.item_image}
              width="100%"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Col>
          <Col sm={3}>
            <h5>{item.name}</h5>
            <h5>$ {item.ls_price}</h5>
            <h5>Size</h5>
            <p>Medium</p>
            <p>Large</p>

            <Button onClick={this.onAddToCart} variant="primary" block>Add to Cart</Button>

          </Col>
          <Col sm={3}>
            <h5>Delivery Address</h5>
            <h5>{item.name}</h5>
            <h5>$ {item.ls_price}</h5>
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <Row style={ratingRowStyle}>
              <Col sm={12}>
                <h4>Reviews and Ratings</h4>
                <p>Rating 3</p>
                <p>Rating 4</p>
                <p>Rating 5</p>
              </Col>
            </Row>
            <Row style={ratingRowStyle}>
              <Col sm={12}>
                <h4>Reviews and Ratings 2</h4>
                <p>Rating 3</p>
                <p>Rating 4</p>
                <p>Rating 5</p>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={topSellerRowStyle}>
              <Col sm={12}>
                <h5>Best Seller</h5>
                <p>{item.name}</p>
                <p>$ {item.ls_price}</p>
              </Col>
            </Row>
            <Row style={topSellerRowStyle}>
              <Col sm={12}>
                <h5>Best Seller 2</h5>
                <p>{item.name}</p>
                <p>$ {item.ls_price}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}



export default ItemDetail
