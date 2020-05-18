import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';



const Rating = (props) => {
  const { rating } = props

  let style = {
    color: "orange"
  }

  // <i class="fa fa-star-half-o fa-2x"></i>

  return (
    <div>
      {
        Array.from(Array(rating), (e, index) => (
          <i class="fa fa-star fa-2x" style={style}></i>
        ))
      }
      {
        Array.from(Array(5-rating), (e, index) => (
          <i class="fa fa-star-o fa-2x" style={style}></i>
        ))
      }
    </div>
  );
}


export default Rating
