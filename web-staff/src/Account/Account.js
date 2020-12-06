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
    };
  }

  updateSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  getSearch = () => {
    this.setState({ searchFound: true });

    this.setState({
      searchResults: this.state.all.filter(
        (item) =>
          item.id.includes(this.state.searchValue.trim()) ||
          item.email.includes(this.state.searchValue.trim()) ||
          item.lastName.includes(this.state.searchValue.trim()) ||
          item.middleName.includes(this.state.searchValue.trim()) ||
          item.firstName.includes(this.state.searchValue.trim())

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
        </div>
        <div className="main">
          <div className="container1">
            <img src={logo} alt="logo" />
            <h1>ACCOUNT OVERVIEW</h1>
            <SelectDate />
            <LogOutButton />
          </div>

          <div style={{ marginLeft: 40, marginTop: 20, width: "95%" }}>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <div>
                <input
                  style={{ width: 600 }}
                  type="text"
                  placeholder="User id , User name , User email"
                  onChange={this.updateSearch}
                />
                <input type="submit" value="Search" onClick={this.getSearch} />
              </div>
            </div>
          </div>
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
                    <TableAccount data={this.state.shipper} type="shipper" />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div style={{ marginTop: 10 }}>
                    <TableAccount data={this.state.customer} type="customer" />
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
