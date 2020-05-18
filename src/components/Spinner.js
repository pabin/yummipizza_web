import React from 'react';

import {
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import './styles.css'


const Spinner = (props) => {

  const { size } = props
  let spinnerSize = (size ? size : 40)
  // <i className={`fa fa-spinner fa-${spinnerSize}x spinner`}></i>

  return (
    <div style={{position: 'absolute'}}>
      <i className={`fa fa-spinner spinner`} style={{fontSize: `${spinnerSize}px`}}></i>
    </div>
  );
}


export default Spinner
