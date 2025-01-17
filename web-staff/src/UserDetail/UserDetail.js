import React, { Component } from "react";
import "../UserDetail/UserDetail.css";
import TableHistoryDetailOfUser from "../UserDetail/TableHistoryDetailOfUser";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../apis/Api";
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      listHistory: [],
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const { type } = this.props.match.params;
    axios
      .get(API_ENDPOINT + "account/" + `${id}/` + `${type}`)
      .then((response) => {
        this.setState({ userData: response.data });
      })
      .then((res) => {
        axios
          .get(API_ENDPOINT + `/histories/${type}/${id}/page/1`)
          .then((position) => {
            this.setState({ listHistory: position.data });
            console.log(this.state.listHistory);
          });
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="avatar avatar-xl">
              <img
                src="https://icon-library.com/images/customer-icon/customer-icon-23.jpg"
                with="100"
                height="100"
                alt="..."
                className="avatar-img rounded-circle"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
              <h2 className="h3 mb-4 page-title">User Detail</h2>
              <div className="my-4">
                <form>
                  <hr className="my-4" />
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="firstname">Full Name</label>
                      <input
                        disabled
                        value={this.state.userData.fullname}
                        type="text"
                        id="firstname"
                        className="form-control"
                     
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inputEmail4">Phone (ID)</label>
                      <input
                        disabled
                        value={this.state.userData.username}
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                      
                      />
                    </div>

                    <div className="form-group col-md-8">
                      <label htmlFor="inputAddress5">Date of Birth</label>
                      <input
                        disabled
                        value={this.state.userData.dob}
                        type="text"
                        className="form-control"
                        id="inputAddress5"
                     
                      />
                    </div>
                  </div>
                  <div className="form-group"></div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="inputCompany5">Wallet</label>
                      <input
                        disabled
                        value={this.state.userData.wallet}
                        type="number"
                        className="form-control"
                        id="inputCompany5"
                       
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputState5">
                        Number of orders cancel{" "}
                      </label>
                      <input
                        disabled
                        value={this.state.userData.numCancel}
                        type="number"
                        className="form-control"
                        id="inputCompany5"
                       
                      />
                    </div>
                    {this.state.userData.role == "shipper" ? (
                      <div className="form-group col-md-4">
                        <label htmlFor="inputZip5">
                          Number of orders delivery
                        </label>
                        <input
                          disabled
                          value={this.state.userData.numDelivery}
                          type="text"
                          className="form-control"
                          id="inputZip5"
                         
                        />
                      </div>
                    ) : (
                      <div className="form-group col-md-4">
                        <label htmlFor="inputZip5">
                          Number of orders success
                        </label>
                        <input
                          disabled
                          value={this.state.userData.numSuccess}
                          type="text"
                          className="form-control"
                          id="inputZip5"
                         
                        />
                      </div>
                    )}
                  </div>
                  {this.state.userData.role == "shipper" ? (
                    <h2 className="h3 mb-4 page-title">Delivery History</h2>
                  ) : (
                    <h2 className="h3 mb-4 page-title">Orders History</h2>
                  )}
                  <hr className="my-4" />
                  {this.state.listHistory.length > 0 ? (
                    <TableHistoryDetailOfUser data={this.state.listHistory} />
                  ) : null}
                  <Link to="/account">
                    <button type="button" className="btn btn-primary">
                      Back
                    </button>{" "}
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
