import React, { useState, useEffect } from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';


// Quantity Calculator component to increase or decrease the item quantity
const QuantityCalculator = (props) => {
  const [quantity, setQuantity] = useState(1);

  const { item } = props

  useEffect(() => {
    item.quantity = quantity
    item.size = "LARGE"
  });


  return (
    <ButtonGroup className="mr-2" aria-label="First group" style={{"backgroundColor": "#EFEFEF"}}>
      <Button variant="default" onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)}>-</Button>
      <input
        type="tel"
        className="form-control"
        style={{"width": "50px", borderRadius: "0px"}}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}/>
      <Button variant="default" onClick={() => setQuantity(quantity > 9 ? 10 : quantity+1)}>+</Button>
    </ButtonGroup>
  );
}


export default QuantityCalculator
