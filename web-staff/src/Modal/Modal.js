import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";



const  ModalChangeShipper = ({address}) => {
  const [show, setShow] = useState(false);
  const [shipperList,setShipperList] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log(location.coords.latitude, location.coords.longitude)
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        setShipperList(response.data);
      })
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

         <label>Location of current shipper</label>
          <div id="shipper">
            <input
              style={{ width: 400 }}
              type="text"
              value={address}
              disabled
            />
            <input type="submit" value="Find" onClick={getLocation} />
          </div>
            <br></br>

          <h3>Shipper available </h3>
          <select name="cars" id="cars">
           {shipperList.map((shipper, index) =>(
             <option key={index} value={shipper.id}>{shipper.name}</option>
           ))}
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
