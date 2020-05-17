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

    let style = {
      backgroundColor: 'white',
      margin: '10px',
      padding: '10px',
      marginRight: "30px",
      marginLeft: "30px",
    }

    return (
      <div style={{backgroundColor: '#DFDFDF', display: 'flex', flexDirection: "column"}}>
        <Row style={style}>
          <Col sm={5}>
            <img
              style={{marginRight: "10px", borderRadius: '5px', margin: '10px'}}
              src={item.item_image}
              height="300"
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
        
        <Row style={style}>
          <Col sm={5}>
            <img
              style={{marginRight: "10px", borderRadius: '5px', margin: '10px'}}
              src={item.item_image}
              height="300"
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
      </div>
    );
  }
}



export default ItemDetail
