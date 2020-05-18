import React from 'react';

import {
  Modal,
} from 'react-bootstrap';

import './styles.css'


const Message = (props) => {

  const { showSuccessMessage, showFailureMessage } = props

  return (
    <Modal
        size="sm"
        show={showSuccessMessage || showFailureMessage}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>
          {
            showSuccessMessage ?
            <div className="d-flex align-items-center justify-content-center">
              <i className="fa fa-check-circle fa-3x" style={{color: '#27AE60', padding: '10px'}}></i>
              <h5  style={{paddingTop: '5px'}}>Added Successfully</h5>
            </div>
            : showFailureMessage ?
            <div className="d-flex align-items-center justify-content-center">
              <i className="fa fa-exclamation-circle fa-3x" style={{color: '#C0392B', padding: '10px'}}></i>
              <h5  style={{paddingTop: '5px'}}>Error, Try again!</h5>
            </div>
            : null
          }
        </Modal.Body>
      </Modal>
  );
}


export default Message
