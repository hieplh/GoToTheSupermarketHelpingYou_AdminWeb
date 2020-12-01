import React, { Component } from "react";
import ShipperIcon from "../images/delivery-man.png";

class ShipperInfo extends Component {
  

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
          <span style={{ fontWeight: "normal" }}>
              Phone :{" "}
            </span>{" "} <span style={{ fontWeight: "bold" ,marginLeft:20}}>{this.props.phone}</span>
          <div style={{marginLeft:10}}>
            <span style={{ fontWeight: "normal" }}>
              Delivery before :{" "}
            </span>{" "}
            <span style={{ fontWeight: "lighter" }}><i>{this.props.time}</i></span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShipperInfo;
