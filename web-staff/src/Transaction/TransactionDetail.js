import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Transaction/TransactionDetail.css";
import ShipperInfo from "../ShipperInfo/ShipperInfo";
import ModalChangeShipper from "../Modal/Modal";
import swal from "sweetalert";

export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
    this.cancelTransaction = this.cancelTransaction.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ detail: response.data });
      });
  }
  cancelTransaction = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  render() {
    return (
      <>
        <div style={{ marginTop: 20, marginLeft: 20 }}>
          <Link to="/home">
            <button type="button" class="btn btn-primary">
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
            <h1 style={{ flexGrow: 2 }}>TRANSACTIONS DETAIL</h1>
            <div style={{ flexGrow: 1 }}>
              <button
                onClick={this.cancelTransaction}
                style={{ margin: 20 }}
                type="submit"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <ModalChangeShipper address={this.state.detail.address ? this.state.detail.address.street : ''} />
            </div>
          </div>

          <br />

          <div className="form-row">
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Order Status</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="dot"></span>
                <div>Delivering</div>
              </div>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Order ID</label>
              <input
                value={this.state.detail.phone}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Total Cost</label>
              <input
                value={this.state.detail.phone}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Ship Cost</label>
              <input
                value={this.state.detail.email}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputPassword4">Shopping Fees</label>
              <input
                value={this.state.detail.phone}
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputEmail4">Refund</label>
              <input
                value={this.state.detail.email}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputCity">Customer name :</label>
              <input
                value={this.state.detail.name}
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Customer phone number</label>
              <input
                value={this.state.detail.phone}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Customer email</label>
              <input
                value={this.state.detail.email}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Delivery Address :</label>
              <input
                value={this.state.detail.phone}
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Supermarket Address :</label>
              <input
                value={this.state.detail.phone}
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
              <label htmlFor="inputCity">Shipper Delivering :</label>
              <ShipperInfo
                name={"Hoang Hiep"}
                phone={"91029102"}
                time={"12120-q12121"}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">Handed over from : :</label>
              <ShipperInfo
                name={"Hoang Hiep"}
                phone={"91029102"}
                time={"12120-q12121"}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">
                Customer verify when deliver success :
              </label>
              <img src="https://via.placeholder.com/150C" alt="verify" />
            </div>
          </div>
         

          <br />
        </div>
      </>
    );
  }
}
