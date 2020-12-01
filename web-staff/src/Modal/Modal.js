import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import MyMapComponent from "../map/Googlemap";
import swal from 'sweetalert';
import { API_ENDPOINT } from "../apis/Api";
const ModalChangeShipper = ({ address , orderID}) => {
  const [show, setShow] = useState(false);
  const [shipperList, setShipperList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shipperID, setShipperID] = useState("");

  const getIdShipper = (e) => {
    setShipperID(e.currentTarget.value);
    console.log(e.currentTarget.value);
    console.log(orderID);
  };

  function changeShipper() {
    axios.get(API_ENDPOINT + `/switch/${orderID}`/`${shipperID}`).then(response => {
      swal({
        title: "Success",
        text: "Change Shipper successfully",
        icon: "success",
      });
    }).then(response => {
      handleClose();
    });
  }

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
          <label>Input shipper ID</label>
          <div id="shipper">
            <input
              style={{ width: 400 }}
              type="text"
              onChange={getIdShipper}
              value={address}
             
            />
            {/* <input type="submit" value="Find" onClick={getLocation} /> */}
          </div>
          <br></br>

          {/* <h3>Shipper available </h3>
          <select name="cars" id="cars">
           {shipperList.map((shipper, index) =>(
             <option key={index} value={shipper.id}>{shipper.name}</option>
           ))}
          </select> */}
          <MyMapComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={changeShipper}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChangeShipper;
