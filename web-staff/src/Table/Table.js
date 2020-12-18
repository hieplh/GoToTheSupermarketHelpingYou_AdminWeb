import React, { Component } from "react";
import "../Table/Table.css";
import Paging from "../Paging/Paging";
import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 8,
    };
    this.styleStatus = this.styleStatus.bind(this);
    // this.viewDetails = this.viewDetails.bind(this);
  }

  styleStatus = (status) => {
    switch (status) {
      case 24:
        return <p style={{ color: "green" }}>Completed</p>;
      case 12:
        return <p style={{ color: "red" }}>Inqueue</p>;
      case 23:
        return <p style={{ color: "orange" }}>Upcoming</p>;
      case 21:
      case 22:
        return <p style={{ color: "blue" }}>Processing</p>;
      case -12:
      case -21:
      case -22:
      case -23:
      case -24:
      case -31:
        return <p style={{ color: "grey" }}>Cancel</p>;
      default:
    }
  };
  // viewDetails = (id) => {
  //   return (
  //     <Redirect to={{ pathname: "/login"+{id}}} />
  //   );
  // }

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
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Order</th>
              <th>Shipper Delivery</th>
              <th>Status</th>
              <th>Detail</th>
             
            </tr>
          </thead>
          <tbody>
            {currentItem.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.cust}</td>
                <td>{item.shipper}</td>
                <td>{this.styleStatus(item.status)}</td>
                <td>
                  <Link to={`/detail/${item.id}`}>
                    View
                  </Link>
                </td>
              
               
              </tr>
            ))}
          </tbody>
        </table>{" "}
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

export default Table;
