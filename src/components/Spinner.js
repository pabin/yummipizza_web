import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import './styles.css'


const Spinner = (props) => {

  return (
    <div style={{position: 'absolute'}}>
      <i className="fa fa-spinner fa-3x spinner"></i>
    </div>
  );
}


export default Spinner
