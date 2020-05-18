import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';



const QuantityCalculator = (props) => {
  const { quantity, onChange, onIncrease, onDecrease } = props

  return (
    <ButtonGroup className="mr-2" aria-label="First group" style={{"backgroundColor": "#EFEFEF"}}>
      <Button variant="default" onClick={onDecrease}>-</Button>
      <input
        type="tel"
        className="form-control"
        id="quantity"
        style={{"width": "50px", borderRadius: "0px"}}
        value={quantity}
        onChange={onChange}/>
      <Button variant="default" onClick={onIncrease}>+</Button>
    </ButtonGroup>
  );
}


export default QuantityCalculator
