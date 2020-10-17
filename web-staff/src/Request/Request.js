import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../DashBoard/DashBoard.css";
import LogOutButton from "../LogOut/Logout";
import logo from "../images/logo.png";
export default class Request extends Component {
  render() {
    return (
      <>
        <div className="sidenav">
          <Link to={"/home"}>Home</Link>
          <Link to={"/requests"}>Request</Link>
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>REQUEST</h1>
            <LogOutButton />
          </div>
        
        </div>
      </>
    );
  }
}
