import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOut/Logout";
import logo from "../images/logo.png";
import { MANAGE_COST_SITE } from "../apis/Api";
export default class CostShipping extends Component {
  render() {
    return (
      <>
        <div className="sidenav">
          <Link to={"/home"}>Home</Link>
          <Link to={"/account"}>Account</Link>
          <Link to={"/cost"}>Cost Shipping</Link>
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>MANAGE COST SHIPPING</h1>

            <LogOutButton />
          </div>
        </div>
        <div style={{ marginLeft: 180, marginTop: 20, width: "95%" }}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe height="200" width="300" title="Iframe Example" src={MANAGE_COST_SITE} />
          </div>
        </div>
      </>
    );
  }
}
