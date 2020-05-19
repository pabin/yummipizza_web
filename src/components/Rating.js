import React from 'react';


// Rating component to render the ratings of a item, based on its value of 1 to 5
const Rating = (props) => {
  const { rating } = props

  let style = {
    color: "orange"
  }

  // <i className="fa fa-star-half-o fa-2x"></i>

  return (
    <div>
      {
        Array.from(Array(rating), (e, index) => (
          <i key={index} className="fa fa-star fa-2x" style={style}></i>
        ))
      }
      {
        Array.from(Array(5-rating), (e, index) => (
          <i key={index} className="fa fa-star-o fa-2x" style={style}></i>
        ))
      }
    </div>
  );
}


export default Rating
