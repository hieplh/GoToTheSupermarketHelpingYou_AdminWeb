import React, { Component } from "react";
import ShipperIcon from "../images/delivery-man.png";

class ShipperInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          src={ShipperIcon}
          alt="ShipperIcon"
          style={{ width: 70, height: 70 }}
        />
        <div style={{ display: "flex", flexDirection: "column" , marginLeft:10 }}>
          <h3 style={{ color: "#1575F2" }}>{this.props.name}</h3>
          <p style={{ fontWeight: "bold" ,marginLeft:20}}>{this.props.phone}</p>
          <div style={{marginLeft:10}}>
            <span style={{ fontWeight: "normal" }}>
              Time receives orders :{" "}
            </span>{" "}
            <span style={{ fontWeight: "lighter" }}><i>{this.props.time}</i></span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShipperInfo;
