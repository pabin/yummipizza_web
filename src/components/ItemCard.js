import React, { Component } from 'react';

import {
  Button,
  Card,
} from 'react-bootstrap';

import { Redirect } from 'react-router-dom';



class ItemCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }

  }


  onAddToCart = () => {
    console.log('on add to cart....');
  }

  render() {
    // <p><del>$ {this.props.price + 5}</del>$5 off</p>

    const { item } = this.props

    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: '/items', state: { item: item } }} />
      )
    } else {
      return (
        <Card style={{ width: '14rem', height: '22rem', margin: '5px'}}>
          <Card.Img
            style={{height: '10rem', width: 'auto'}}
            onClick={() => {this.setState({redirect: true})}}
            variant="top"
            src={item.item_image} />
          <Card.Body>
            <Card.Text>
              {item.name}
            </Card.Text>
            <Card.Title style={{color: 'orange'}}>$ {item.ls_price}</Card.Title>
          </Card.Body>
          <Button onClick={this.onAddToCart} style={{margin: "10px", width: '13rem', alignSelf: 'center'}} variant="primary" block>Add to Cart</Button>
        </Card>
      );
    }
  }
}



export default ItemCard
