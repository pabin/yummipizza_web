import React, { Component } from 'react';

import {
  Button,
  Card,
} from 'react-bootstrap';



class ItemCard extends Component {


  render() {
    // <p><del>$ {this.props.price + 5}</del>$5 off</p>

    return (
      <Card style={{ width: '14rem', height: '20rem', margin: '5px' }}>
        <Card.Img variant="top" src={this.props.image} />
        <Card.Body>
          <Card.Text>
            {this.props.name}
          </Card.Text>
          <Card.Title style={{color: 'orange'}}>$ {this.props.price}</Card.Title>
        </Card.Body>
        <Button style={{margin: "10px", width: '13rem', alignSelf: 'center'}} variant="primary" block>Add to Cart</Button>
      </Card>
    );
  }
}



export default ItemCard
