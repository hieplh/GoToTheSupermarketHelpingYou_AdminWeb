import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Transaction/TransactionDetail.css";
export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
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
                style={{ margin: 20 }}
                type="submit"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button
                style={{ margin: 20 }}
                type="submit"
                className="btn btn-warning"
              >
                Change Shipper
              </button>
            </div>
          </div>

          <br />

          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Order Status
            </label>
            <div className="col-sm-10">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="dot"></span>
                <div>Delivering</div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Order ID</label>
              <input
              value={this.state.detail.id}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Total Cost</label>
              <input
               value={this.state.detail.phone}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Ship Cost</label>
              <input
               value={this.state.detail.email}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Shopping Fees</label>
              <input
                value={this.state.detail.phone}
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Refund</label>
              <input value={this.state.detail.phone} type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Shipper deliver:</label>
              <input value={this.state.detail.name} type="text" className="form-control" id="inputCity" />
            </div>
            
          </div>
          

          <br />
        </div>
      </>
    );
  }
}
