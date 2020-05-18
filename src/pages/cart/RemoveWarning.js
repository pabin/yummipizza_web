import React from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';



const RemoveWarning = (props) => {
  const { show, onHide } = props

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Item Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're removing this item!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onHide}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default RemoveWarning
