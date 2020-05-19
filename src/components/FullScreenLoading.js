import React from 'react';

import {
  Modal,
} from 'react-bootstrap';

import Spinner from './Spinner';


// Full screen loading component to display a full screen loader API actions
const FullScreenLoading = (props) => {
  const { show, message } = props

  return (
    <Modal
        size="sm"
        show={show}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <h5 style={{paddingTop: '40px'}}></h5>
            <Spinner size={45} />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <h5  style={{paddingTop: '15px'}}>{message}</h5>
          </div>

        </Modal.Body>
      </Modal>
  );
}


export default FullScreenLoading
