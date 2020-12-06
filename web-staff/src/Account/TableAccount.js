import React, { Component } from "react";
import "../Table/Table.css";
import Paging from "../Paging/Paging";
import { Link } from "react-router-dom";

class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 8,
    };

    // this.viewDetails = this.viewDetails.bind(this);
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of birth</th>
                <th>Wallet</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    {item.lastName} {item.middleName} {item.firstName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.dob}</td>
                  <td>{item.wallet}</td>
                  <td>Active</td>
                  <td>
                  <Link to={`/user/${item.role}/${item.id}`}>
                    <button>View</button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of birth</th>
                <th>Wallet</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    {item.lastName} {item.middleName} {item.firstName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.dob}</td>
                  <td>{item.wallet}</td>
                  <td>Active</td>
                  <td>
                  <Link to={`/user/${item.role}/${item.id}`}>
                    <button>View</button>
                  </Link>
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
