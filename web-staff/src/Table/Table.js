import React, { Component } from "react";
import "../Table/Table.css";
import Paging from "../Paging/Paging";
import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      itemsPerPage:8,

    };
    this.styleStatus = this.styleStatus.bind(this);
    // this.viewDetails = this.viewDetails.bind(this);
  }

  styleStatus = (status) => {
    switch (status) {
      case true:
        return <p style={{ color: "green" }}>Completed</p>;
      case false:
        return <p style={{ color: "red" }}>Cancel</p>;

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
    const indexOfFirstPost = indexOfLastPost -this.state.itemsPerPage;
    const currentItem = this.props.data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber,e) => {
      e.preventDefault();
      this.setState({currentPage: pageNumber})
    };
    return (
      <>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Order</th>
              <th>Shipper Delivery</th>
              <th>Status</th>
              <th>Detail</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{this.styleStatus(item.completed)}</td>
                <td><Link to={`/detail/${item.userId}`}><button>View</button></Link></td>
                <td><a onClick={(e) => e.preventDefault} href="#">Change Shipper</a></td>
                <td><a onClick={(e) => e.preventDefault} href="#">Cancel</a></td>
              </tr>
            ))}
          </tbody>
        </table> <br/>
        <div style={{display:'flex',flexDirection: 'row-reverse'}}>
         
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
