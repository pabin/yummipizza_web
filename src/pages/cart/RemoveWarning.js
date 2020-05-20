import React from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';



// Warning modal component to display a warnign on performing some user actions
const RemoveWarning = (props) => {
  const { show, onHide, onConfirmDelete } = props

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
        <Button onClick={onConfirmDelete} variant="danger">
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default RemoveWarning
