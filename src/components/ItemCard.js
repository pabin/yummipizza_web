import React, { Component } from 'react';

import {
  Button,
  Card,
} from 'react-bootstrap';



class ItemCard extends Component {


  render() {

    return (
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={this.props.image} />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>
            {this.props.price}
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    );
  }
}



export default ItemCard
