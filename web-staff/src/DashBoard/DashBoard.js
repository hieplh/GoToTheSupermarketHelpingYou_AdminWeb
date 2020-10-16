import React, { Component } from "react";
import LogOutButton from "../LogOut/Logout";
import SelectDate from "../SelectDate/SelectDate";
import logo from "../images/logo.png";
import "../DashBoard/DashBoard.css";
import Title from "../Title/Title";
import upcoming from "../images/fast-time.png";
import queue from "../images/queue.png";
import processing from "../images/processing.png";
import complete from "../images/complete.png";
import cancel from "../images/cancel.png";
import timeout from "../images/timeout.png";
import TransactionOverall from "../Transaction/TransactionOverall";
import TransactionNAV from "../Transaction/TransactionNAV";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { MDCRipple } from "@material/ripple";
class DashBoard extends Component {
  render() {
    return (
      <>
        <div className="sidenav">
          <a href="#">Home</a>
          <a href="#">Request</a>
        
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>DASHBOARD OVERVIEW</h1>
            <SelectDate />
            <LogOutButton />
          </div>
          <Title />
          <div style={{ display: "flex" }}>
            <TransactionOverall
              Title={"Upcoming Transactions"}
              num={8}
              image={upcoming}
              colorBackground={"#ffecd2"}
            />
            <TransactionOverall
              Title={"Inqueue Transactions"}
              num={8}
              image={queue}
              colorBackground={"#f5efef"}
            />
            <TransactionOverall
              Title={"Processing Transactions"}
              num={8}
              image={processing}
              colorBackground={"rgb(223 233 255)"}
            />
            <TransactionOverall
              Title={"Complete Transactions"}
              num={8}
              image={complete}
              colorBackground={"#e4efe9"}
            />
            <TransactionOverall
              Title={"Cancel Transactions"}
              num={8}
              image={cancel}
              colorBackground={"rgb(218 218 218)"}
            />
            <TransactionOverall
              Title={"Time Out Transactions"}
              num={8}
              image={timeout}
              colorBackground={"rgb(255 126 126)"}
            />
          </div>
          <br />
          <br /> <br />
          <br />
          <TransactionNAV />
        </div>
      </>
    );
  }
}

export default DashBoard;
