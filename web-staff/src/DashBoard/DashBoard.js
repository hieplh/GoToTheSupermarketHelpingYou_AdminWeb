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
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
import {API_ENDPOINT} from '../apis/Api'
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: 0,
      upcoming: 0,
      inqueue: 0,
      processing: 0,
      completed: 0,
      cancel: 0,
      timeout: 0,
    };
    this.autoFecth = this.autoFecth.bind(this);
  }

  autoFecth = () => {
    
    axios
    .get(API_ENDPOINT+"dashboard/upcoming/count")
    .then((res) => {
      this.setState({ upcoming: res.data });
    })
    .then(
      axios
        .get(API_ENDPOINT+"dashboard/inqueue/count")
        .then((res) => {
          this.setState({ inqueue: res.data });
        })
    )
    .then(
      axios
        .get(API_ENDPOINT+"dashboard/inprogress/count")
        .then((res) => {
          this.setState({ processing: res.data });
        })
    )
    .then(
      axios
        .get(API_ENDPOINT+"dashboard/done/count")
        .then((res) => {
          this.setState({ completed: res.data });
        })
    )
    .then(
      axios
      .get(API_ENDPOINT+"dashboard/inprocess/count")
      .then((res) => {
        this.setState({ all: res.data });
      })
    ).then(
      axios
      .get(API_ENDPOINT+"dashboard/cancel/count")
      .then((res) => {
        this.setState({ cancel: res.data });
      })
    );
  }

  componentDidMount() {
    this.autoFecth();
    setInterval(function(){ 
        this.autoFecth();
      
     }.bind(this), 20000);
  }

  render() {
    return (
      <>
        <div className="sidenav">
          <Link to={"/home"}>Home</Link>
          <Link to={"/account"}>Account</Link>
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>DASHBOARD OVERVIEW</h1>
          
            <LogOutButton />
          </div>
          <Title numberTrans={this.state.all} />
          <div style={{ display: "flex" }}>
            <TransactionOverall
              Title={"Upcoming Transactions"}
              num={this.state.upcoming}
              image={upcoming}
              colorBackground={"#ffecd2"}
            />
            <TransactionOverall
              Title={"Inqueue Transactions"}
              num={this.state.inqueue}
              image={queue}
              colorBackground={"#f5efef"}
            />
            <TransactionOverall
              Title={"Processing Transactions"}
              num={this.state.processing}
              image={processing}
              colorBackground={"rgb(223 233 255)"}
            />
            <TransactionOverall
              Title={"Complete Transactions"}
              num={this.state.completed}
              image={complete}
              colorBackground={"#e4efe9"}
            />
            <TransactionOverall
              Title={"Cancel Transactions"}
              num={this.state.cancel}
              image={cancel}
              colorBackground={"rgb(218 218 218)"}
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
