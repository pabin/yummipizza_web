import React from 'react';
// import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from 'react-bootstrap';

import './ItemDetail.css'
import QuantityCalculator from '../../components/QuantityCalculator'


class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
      quantity: 1,
    }

  }


  onAddToCart = () => {
    console.log('on add to cart...');
  }

  onContinueShopping = () => {
    console.log('on add to cart...');
  }

  render() {
    const { item } = this.props.location.state
    const { quantity } = this.state

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
          <Col sm={4}>
            <h5>{item.name}</h5>
            <i class="fa fa-star fa-2x" style={{color: "orange"}}></i>
            <i class="fa fa-star fa-2x" style={{color: "orange"}}></i>
            <i class="fa fa-star fa-2x" style={{color: "orange"}}></i>
            <i class="fa fa-star-half-o fa-2x" style={{color: "orange"}}></i>
            <i class="fa fa-star-o fa-2x" style={{color: "orange"}}></i>

            <hr/ >
            <h4 style={{color: "orange"}}>$ {item.ls_price}</h4>
            <hr/ >
            <Row>
              <Col sm={2}>
                <h6 className="title">Size</h6>
              </Col>
              <Col sm={10}>
                <Form inline style={{justifyContent: 'space-around'}}>
                  <Form.Check
                    custom
                    type="radio"
                    id="medium_size"
                    name="size_radio"
                    label="Medium"
                    />
                  <Form.Check
                    custom
                    type="radio"
                    id="large_size"
                    name="size_radio"
                    label="Large"
                    />
                </Form>
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
              <Col sm={3}>
                <h6 className="title">Quantity</h6>
              </Col>
              <Col sm={9}>
                <QuantityCalculator
                  quantity={quantity}
                  onChange={(event) => this.setState({quantity: event.target.value})}
                  onIncrease={() => this.setState({quantity: quantity + 1})}
                  onIncrease={() => this.setState(quantity > 9 ?{ quantity: 10} : {quantity: quantity + 1})}
                  onDecrease={() => this.setState(quantity > 1 ? { quantity: quantity - 1} : {quantity: 1})}
                  />
              </Col>
            </Row>

            <Row style={{marginTop: '20px'}}>
              <Col md={6}>
                <Button onClick={this.onContinueShopping} variant="primary" block>Continue Shopping</Button>
              </Col>
              <Col md={6}>
                <Button onClick={this.onAddToCart} variant="primary" block>Add to Cart</Button>
              </Col>
            </Row>


          </Col>
          <Col sm={3}>
            <h6 className="title">Delivery Options</h6>
            <p><i class="fa fa-map-marker" style={{fontSize: '20px', margin: '5px'}}></i> With in 20 KM of city</p>
            <hr/ >

            <h6 className="title">Returns</h6>
            <p><i class="fa fa-times-circle-o" style={{fontSize: '20px', margin: '5px'}}></i>No return of delivered goods</p>
            <hr/ >
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
