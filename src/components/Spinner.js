import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import './styles.css'


// Spinner component to display a spinner loader on different user actions, can be placed on desired places
const Spinner = (props) => {

  const { size } = props
  let spinnerSize = (size ? size : 45)
  // <i className={`fa fa-spinner fa-${spinnerSize}x spinner`}></i>

  return (
    <div style={{position: 'absolute'}}>
      <i className={`fa fa-spinner spinner`} style={{fontSize: `${spinnerSize}px`}}></i>
    </div>
  );
}


export default Spinner
