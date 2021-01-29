import React, { Component } from "react";
import "../Table/Table.css";
import Paging from "../Paging/Paging";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import NumberFormat from "react-number-format";
import { API_ENDPOINT } from "../apis/Api";
class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 8,
    };
    this.disableAccount = this.disableAccount.bind(this);

    // this.viewDetails = this.viewDetails.bind(this);
  }

  disableAccount(id) {
    swal({
      title: "Are you sure to disable this account ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      axios.delete(API_ENDPOINT + "delete/" + id).then((res) => {
        if (res.status === 200) {
          swal(
            "Disable account successfully !",

            {
              icon: "success",
            }
          ).then((value) => {
            window.location.reload();
          });
        }
      });
    });
  }
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
    const currentItem = this.props.data.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNumber, e) => {
      e.preventDefault();
      this.setState({ currentPage: pageNumber });
    };

    return (
      <>
        {this.props.type === "shipper" ? (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Phone (ID)</th>
                <th>Name</th>

                <th>Date of birth</th>
                <th>Wallet</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.fullname}</td>

                  <td>{item.dob}</td>
                  <td>
                    <NumberFormat
                      value={item.wallet}
                      displayType={"text"}
                      thousandSeparator={true}
                    />{" "}
                    vnd
                  </td>
                  <td>Active</td>
                  <td>
                    <Link to={`/user/${item.role}/${item.username}`}>View</Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.disableAccount(item.username)}
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Phone (ID)</th>
                <th>Name</th>

            
                <th>Date of birth</th>
                <th>Wallet</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>
                    {item.fullname}
                  </td>

                
                  <td>{item.dob}</td>
                  <td>
                    <NumberFormat
                      value={item.wallet}
                      displayType={"text"}
                      thousandSeparator={true}
                    />{" "}
                    vnd
                  </td>
                  <td>Active</td>
                  <td>
                    <Link to={`/user/${item.role}/${item.username}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}{" "}
        <br />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Paging
            itemsPerPage={this.state.itemsPerPage}
            totalItems={this.props.data.length}
            paginate={paginate}
          />
        </div>
      </>
    );
  }
}

export default TableAccount;
