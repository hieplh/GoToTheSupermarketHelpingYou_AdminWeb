import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Transaction/TransactionDetail.css";
import ShipperInfo from "../ShipperInfo/ShipperInfo";
import ModalChangeShipper from "../Modal/Modal";

import swal from "sweetalert";
import MyMapComponent from "../map/Googlemap";
// import { Button } from "@material-ui/core";

import Geocode from "react-geocode";
import { API_ENDPOINT } from "../apis/Api";
export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      statusColor: "#4CAF50",
      statusDetails: "Delivering",
      shipperPosition: {},
      addressDeliveryLatLng: {},
      imageOrder: "",
      addLat: "",
      addLng: "",
    };
    this.cancelTransaction = this.cancelTransaction.bind(this);
    this.styleStatus = this.styleStatus.bind(this);
  }

  styleStatus = (status) => {
    switch (status) {
      case 24:
        return <p style={{ color: "green" }}>Done</p>;
      case 12:
        return <p style={{ color: "red" }}>Pending</p>;
      case 23:
        return <p style={{ color: "orange" }}>Delivering</p>;
      case 21:
        return <p style={{ color: "brown" }}>Accepted</p>;
      case 22:
        return <p style={{ color: "blue" }}>Shopping</p>;
      default:
        return <p style={{ color: "grey" }}>Cancel</p>;
    }
  };
  componentDidMount() {
    Geocode.setApiKey("AIzaSyCvlIOQUZEmyNxvrwKtXACB_QqycPTnAmE");

    // set response language. Defaults to english.
    Geocode.setLanguage("vi");

    const { id } = this.props.match.params;

    axios
      .get(API_ENDPOINT + `/order/staff/${id}`)
      .then((response) => {
        this.setState({ detail: response.data });
        this.setState({
          imageOrder:
            API_ENDPOINT +
            "image/" +
            `${this.state.detail.id}` +
            "_1.png/shipper/" +
            `${
              this.state.detail.shipper && this.state.detail.shipper.username
            }`,
        });
      })
      .then((res) => {
        axios.get(API_ENDPOINT + `/tracking/${id}`).then((position) => {
          this.setState({ shipperPosition: position.data });
        });
      });

    setInterval(
      function () {
        axios
          .get(API_ENDPOINT + `/order/staff/${id}`)
          .then((response) => {
            this.setState({ detail: response.data });
            this.setState({
              imageOrder:
                API_ENDPOINT +
                "image/" +
                `${this.state.detail.id}` +
                "_1.png/shipper/" +
                `${
                  this.state.detail.shipper &&
                  this.state.detail.shipper.username
                }`,
            });
          })
          .then((res) => {
            axios.get(API_ENDPOINT + `/tracking/${id}`).then((position) => {
              this.setState({ shipperPosition: position.data });
            });
            Geocode.fromAddress(`${this.state.detail.addressDelivery}`).then(
              (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                  addLat: lat,
                  addLng: lng,
                });

                // console.log("Dia chi giao : " + this.state.detail.addressDeliveryLatLng);
              },
              (error) => {
                console.error(error);
              }
            );
          });
      }.bind(this),
      5000
    );
  }

  cancelTransaction = () => {
    var staffID = sessionStorage.getItem("userToken");
    swal({
      title: "Are you sure to cancel this transaction ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      console.log(
        API_ENDPOINT + "delete/" + this.state.detail.id + "/staff/" + staffID
      );
      if (willDelete) {
        if (this.state.detail.status == 24) {
          swal("Error occurred !", {
            icon: "error",
          });
        }
        axios
          .delete(
            API_ENDPOINT +
              "delete/" +
              this.state.detail.id +
              "/staff/" +
              staffID
          )
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
              swal("Cancel transaction successfully !", {
                icon: "success",
              });
            } else {
            }
          });
      } else {
      }
    });
  };

  render() {
    return (
      <>
        <div style={{ marginTop: 20, marginLeft: 20 }}>
          <Link to="/home">
            <button type="button" className="btn btn-primary">
              Back
            </button>
          </Link>{" "}
        </div>
        <br /> <br />
        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1 style={{ flexGrow: 2 }}>ORDER DETAIL</h1>
            <div style={{ flexGrow: 1 }}>
              <button
                onClick={this.cancelTransaction}
                style={{ margin: 20 }}
                type="submit"
                className="btn btn-danger"
              >
                Cancel
              </button>

              {/* <Button variant="warning" onClick={this.changeShipper}>
                Changes Shipper
              </Button> */}
              {/* <ModalChangeShipper
                address={
                  this.state.detail.address
                    ? this.state.detail.address.street
                    : ""
                }
              /> */}
            </div>
          </div>

          <br />

          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Order Status</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <span style={{height:25,width:25,backgroundColor:this.state.statusColor,borderRadius:'50%',display: "inline-block",margin:10}}></span> */}
                <div>
                  <h3>{this.styleStatus(this.state.detail.status)}</h3>
                </div>
              </div>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Order ID</label>
              <input
                readOnly
                value={this.state.detail.id}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Total Cost</label>
              <input
                readOnly
                value={this.state.detail.totalCost}
                type="text"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Ship Cost</label>
              <input
                readOnly
                value={this.state.detail.costDelivery}
                type="email"
                className="form-control"
                id="inputEmail4"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Shopping Fees</label>
              <input
                readOnly
                value={this.state.detail.costShopping}
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Refund for customer</label>
              <input
                readOnly
                value={this.state.detail.refundCost}
                type="email"
                className="form-control"
                id="inputEmail4"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputCity">Customer name :</label>
              <input
                readOnly
                value={
                  this.state.detail.customer &&
                  this.state.detail.customer.fullname
                }
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Customer phone number</label>
              <input
                readOnly
                value="091291021"
                type="text"
                className="form-control"
                id="inputPassword4"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Delivery Address :</label>
              <input
                readOnly
                value={this.state.detail.addressDelivery}
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Supermarket Address :</label>
              <input
                readOnly
                value={
                  this.state.detail.market && this.state.detail.market.name
                }
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6"></div>
            <div className="form-group col-md-6"></div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6"></div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputCity">Shipper Delivery :</label>
              <ul>
                <li>
                  License Plate :{" "}
                  <ul>
                    <li>
                      {" "}
                      {this.state.detail.shipper &&
                        this.state.detail.shipper.vin}
                    </li>
                  </ul>
                </li>
                <li>
                  Phone:{" "}
                  <ul>
                    <li>
                      {" "}
                      {this.state.detail.shipper &&
                        this.state.detail.shipper.username}{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  Name:{" "}
                  <ul>
                    <li>
                      {this.state.detail.shipper &&
                        this.state.detail.shipper.fullname}{" "}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* <div className="form-group col-md-4">
              <label htmlFor="inputState">Handed over from : :</label>
              <ShipperInfo
                name={this.state.detail.shipper}
                phone={"91029102"}
                time={"12120-q12121"}
              />
            </div> */}
            <div className="form-group col-md-4">
              <label htmlFor="inputState">
                Shipper verify when deliver success :
              </label>
              {this.state.detail.status === 24 ? (
                <img
                  src={
                    API_ENDPOINT +
                    "image/" +
                    `${this.state.detail.id}` +
                    "_1.png/shipper/" +
                    `${
                      this.state.detail.shipper &&
                      this.state.detail.shipper.username
                    }`
                  }
                  alt="Evidence"
                  width="300"
                  height="200"
                ></img>
              ) : (
                <img
                  src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
                  alt="Evidence"
                  width="300"
                  height="200"
                ></img>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-8">
              <MyMapComponent
                marketPositionLat={
                  this.state.detail.market && this.state.detail.market.lat
                }
                marketPositionLong={
                  this.state.detail.market && this.state.detail.market.lng
                }
                addressDeliveryLat={this.state.addLat}
                addressDeliveryLng={this.state.addLng}
                shipperPosition={this.state.shipperPosition}
                shipperPositionLat={parseFloat(
                  this.state.shipperPosition["lat"]
                )}
                shipperPositionLong={parseFloat(
                  this.state.shipperPosition["lng"]
                )}
              />
            </div>
          </div>

          <br />
        </div>
      </>
    );
  }
}
