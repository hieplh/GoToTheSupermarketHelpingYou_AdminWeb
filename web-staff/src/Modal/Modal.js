import { Modal, Button } from "react-bootstrap";

import React, { Component, useState } from "react";

function ModalChangeShipper() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Changes Shipper
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Shipper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              style={{ width: 400 }}
              type="text"
              placeholder="Location"
            />
            <input type="submit" value="Find" />
          </div>
            <br></br>

          <h3>Shipper available </h3>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChangeShipper;
