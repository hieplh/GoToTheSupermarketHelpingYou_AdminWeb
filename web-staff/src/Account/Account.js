import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../apis/Api";
import LogOutButton from "../LogOut/Logout";
import SelectDate from "../SelectDate/SelectDate";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TableAccount from "../Account/TableAccount";
import logo from "../images/logo.png";
import "../DashBoard/DashBoard.css";
import "../Account/Button.css";
import swal from "sweetalert";
import Moment from "moment";
import DatePicker from "react-datepicker";
import { Modal, Button } from "react-bootstrap";
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      shipper: [],
      customer: [],
      searchValue: "",
      searchFound: false,
      searchResults: [],
      showModal: false,
      userID: "",
      firstName: "",
      middleName: "",
      fullName: "",
      dob: new Date(),
      phone: "",
      license: "",
      password: "12345678",
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.updateUserValue = this.updateUserValue.bind(this);
    this.updateFirstNameValue = this.updateFirstNameValue.bind(this);
    this.updateMiddleNameValue = this.updateMiddleNameValue.bind(this);
    this.updateFullNameValue = this.updateFullNameValue.bind(this);
    this.updateDob = this.updateDob.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateLicense = this.updateLicense.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.makePassword = this.makePassword.bind(this);
    this.confirmOTP = this.confirmOTP.bind(this);
  }

  confirmOTP(otp, passwordRandom) {
    axios
      .get(
        API_ENDPOINT +
          "account/" +
          `${this.state.phone}` +
          "/otp/" +
          `${otp}` +
          "/register"
      )
      .then(function (response) {
        console.log(response.data + "otp ver");
        alert("Your password is  :" + `${passwordRandom}`);
      });
  }

  submitForm(event) {
    var dateYMD = Moment(this.state.dob).format("YYYY-MM-DD");
    var passwordRandom = this.makePassword(5);
    var phoneOfUser = this.state.phone;

    axios
      .post(API_ENDPOINT + "account/register/", {
        dob: this.state.dob,
        fullname: this.state.fullName,
        password: passwordRandom,
        role: "shipper",
        username: this.state.phone,
        vin: this.state.license,
      })
      .then(function (response) {
        if (response.status == 200) {
          var matches = response.data.match(/(\d+)/);
          axios
            .get(
              API_ENDPOINT +
                "account/" +
                `${phoneOfUser}` +
                "/otp/" +
                `${matches[0]}` +
                "/register"
            )
            .then(function (response) {
              swal({
                icon: "success",
                title: "Create account successfully !",
                text: "Your password is  :" + `${passwordRandom}`,
              });
            });
        }
      })
      .catch(function (error) {});

    event.preventDefault();
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  updateUserValue(event) {
    this.setState({ userID: event.target.value });
    console.log(event.target.value);
  }
  updateFirstNameValue(event) {
    this.setState({ firstName: event.target.value });
    console.log(event.target.value);
  }
  updateMiddleNameValue(event) {
    this.setState({ middleName: event.target.value });
    console.log(event.target.value);
  }
  updateFullNameValue(event) {
    this.setState({ fullName: event.target.value });
    console.log(event.target.value);
  }
  updateDob(date) {
    this.setState({ dob: date });
    console.log(this.state.dob);
  }
  updatePhone(event) {
    this.setState({ phone: event.target.value });
    console.log(event.target.value);
  }
  updateLicense(event) {
    this.setState({ license: event.target.value });
    console.log(event.target.value);
  }
  updateSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  makePassword(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getSearch = () => {
    this.setState({ searchFound: true });

    this.setState({
      searchResults: this.state.all.filter(
        (item) =>
          item.username

            .trim()
            .includes(this.state.searchValue.toLowerCase().trim()) ||
          item.fullname
            .toLowerCase()
            .trim()
            .includes(this.state.searchValue.toLowerCase().trim())
        // ||
        // item.shipper.includes(this.state.searchValue.trim()
        // )
      ),
    });
  };
  showAll = () => {
    this.setState({ searchFound: false });
  };

  componentDidMount() {
    axios
      .get(API_ENDPOINT + `accounts/shipper/0`)
      .then((response) => {
        this.setState({ shipper: response.data });
        this.setState({ all: response.data });
      })
      .then((res) => {
        axios.get(API_ENDPOINT + `accounts/customer/0`).then((position) => {
          this.setState({ customer: position.data });
          this.setState({ all: this.state.all.concat(position.data) });
        });
      });
  }
  render() {
    return (
      <>
        <div className="sidenav">
          <Link to={"/home"}>Home</Link>
          <Link to={"/account"}>Account</Link>
          <Link to={"/cost"}>Cost Shipping</Link>
          <Link to={"/income"}>Income</Link>
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>ACCOUNT OVERVIEW</h1>

            <LogOutButton />
          </div>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Create Shipper Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitForm}>
                <div className="form-group">
                  <label>Full name:</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    onChange={this.updateFullNameValue}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth:</label> <br />
                  <input
                    type="date"
                    name="expiration date"
                    value={this.state.dob}
                    onChange={(event) =>
                      this.setState({ dob: event.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone :</label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    onChange={this.updatePhone}
                  />
                </div>
                <div className="form-group">
                  <label>License Plates :</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    onChange={this.updateLicense}
                  />
                </div>
                <div className="form-group">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>

          <div style={{ marginLeft: 40, marginTop: 20, width: "95%" }}>
            <button className="button button1" onClick={this.open}>
              Create Shipper Account
            </button>
            <br />
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <div>
                <input
                  style={{ width: 600 }}
                  type="text"
                  placeholder="User id , User name"
                  onChange={this.updateSearch}
                />
                <input type="submit" value="Search" onClick={this.getSearch} />
              </div>
            </div>
          </div>
          <br />
          <br />
          {this.state.searchFound ? (
            <div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.showAll}
              >
                Show All
              </button>
              <div style={{ marginTop: 10 }}>
                {this.state.searchResults.length !== 0 ? (
                  <TableAccount data={this.state.searchResults} />
                ) : (
                  "No Results Found"
                )}
              </div>
            </div>
          ) : (
            <div style={{ marginLeft: 40, marginTop: 20, width: "95%" }}>
              <Tabs defaultIndex={0}>
                <TabList>
                  <Tab>Shipper</Tab>
                  <Tab>Customer</Tab>
                </TabList>

                <TabPanel>
                  <div style={{ marginTop: 10 }}>
                    {this.state.shipper.length > 0 ? (
                      <TableAccount data={this.state.shipper} type="shipper" />
                    ) : null}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div style={{ marginTop: 10 }}>
                    {this.state.customer.length > 0 ? (
                      <TableAccount
                        data={this.state.customer}
                        type="customer"
                      />
                    ) : null}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          )}
        </div>
      </>
    );
  }
}
