import React, { Component } from "react";
import Paging from "../Paging/Paging";
import "../Table/Table.css";
class TableHistoryDetailOfUser extends Component {
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
      case -12:
      case -21:
      case -22:
      case -23:
      case -24:
      case -31:
        return <p style={{ color: "red" }}>Cancel</p>;
      default:
    }
  };
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
              <th>Date</th>
              <th>Time</th>
              <th>Total Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.createDate}</td>
                <td>{item.createTime}</td>
                <td>{item.totalCost}</td>
                <td>{this.styleStatus(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
        <br />
       
        <div className="d-flex justify-content-end">
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

export default TableHistoryDetailOfUser;
