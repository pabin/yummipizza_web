import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';


// Quantity Calculator component to increase or decrease the item quantity
const QuantityCalculator = (props) => {
    const { quantity, increaseQuantity, decreaseQuantity, item } = props

    return (
      <ButtonGroup className="mr-2" aria-label="First group" style={{"backgroundColor": "#EFEFEF"}}>
        <Button variant="default" onClick={item ? () => decreaseQuantity(item) : decreaseQuantity}>-</Button>
        <input
          disabled
          type="number"
          className="form-control"
          style={{"width": "50px", borderRadius: "0px"}}
          value={quantity}
          />
        <Button variant="default" onClick={item ? () => increaseQuantity(item) : increaseQuantity}>+</Button>
      </ButtonGroup>
    );
}


export default QuantityCalculator
