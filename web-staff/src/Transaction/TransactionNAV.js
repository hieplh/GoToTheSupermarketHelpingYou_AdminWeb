import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Table from "../Table/Table";
import { API_ENDPOINT } from "../apis/Api";
export default class TransactionNAV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      inprocess: [],
      upcoming: [],
      inqueue: [],
      complete: [],
      uncomplete: [],
      cancel: [],
      searchValue: "",
      searchFound: false,
      searchResults: [],
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.showAll = this.showAll.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }

  componentDidMount() {
    axios.get(API_ENDPOINT + "orders/all").then((res) => {
      this.setState({ all: res.data });
      this.setState({
        inprocess: this.state.all.filter(
          (order) => order.status === 21 || order.status === 22
        ),
      });
      this.setState({
        upcoming: this.state.all.filter((order) => order.status === 23),
      });
      this.setState({
        complete: this.state.all.filter((order) => order.status === 24),
      });
      this.setState({
        inqueue: this.state.all.filter((order) => order.status === 12),
      });
      this.setState({
        cancel: this.state.all.filter((order) => order.status < 0),
      });
    });

    setInterval(
      function () {
        axios.get(API_ENDPOINT + "orders/all").then((res) => {
          this.setState({ all: res.data });
          this.setState({
            inprocess: this.state.all.filter(
              (order) => order.status === 21 || order.status === 22
            ),
          });
          this.setState({
            upcoming: this.state.all.filter((order) => order.status === 23),
          });
          this.setState({
            complete: this.state.all.filter((order) => order.status === 24),
          });
          this.setState({
            inqueue: this.state.all.filter((order) => order.status === 12),
          });
        });
      }.bind(this),
      20000
    );
  }
  // filterStatusTransition = (status) => {
  //   switch (status) {
  //     case 1:
  //       let completeData = this.state.data.filter(
  //         (order) => order.completed === true
  //       );
  //       // this.setState({
  //       //   data: this.state.data.filter((order) => order.completed === true),
  //       // });
  //       console.log(completeData);
  //       this.setState({ data: completeData });
  //       break;
  //     case 2:
  //       let uncompleteData = this.state.data.filter(
  //         (order) => order.completed === false
  //       );
  //       this.setState({ data: uncompleteData });
  //       break;

  //     default:
  //       this.setState({ data: this.state.tmp });
  //   }
  // };

  updateSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  getSearch = () => {
    this.setState({ searchFound: true });
    this.setState({
      searchResults: this.state.all.filter(
        (item) =>
          item.id.includes(this.state.searchValue.trim()) ||
          item.cust.includes(this.state.searchValue.trim())
        // ||
        // item.shipper.includes(this.state.searchValue.trim()
        // )
      ),
    });
  };
  showAll = () => {
    this.setState({ searchFound: false });
  };

  render() {
    // const searchRs = this.state.all
    //   .filter((data) => {
    //     if (this.state.searchValue === "") return data;
    //     else if (
    //       data.userId.includes(this.state.searchValue) ||
    //       data.title.includes(this.state.searchValue)
    //     ) {
    //       return data;
    //     }
    //   })
    //   .map((data) => {
    //     return <Table data={data} />;
    //   });
    return (
      <>
        <div style={{ marginLeft: 40, marginTop: 20, width: "95%" }}>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <div>
              <input
                style={{ width: 600 }}
                type="text"
                placeholder="Order id, customer id "
                onChange={this.updateSearch}
              />
              <input type="submit" value="Search" onClick={this.getSearch} />
            </div>
          </div>
          <br/>

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
                  <Table data={this.state.searchResults} />
                ) : (
                  "No Results Found"
                )}
              </div>
            </div>
          ) : (
            <Tabs defaultIndex={0}>
              <TabList>
                <Tab>All</Tab>
                <Tab>Upcoming</Tab>
                <Tab>Inqueue</Tab>
                <Tab>Processing</Tab>
                <Tab>Complete</Tab>
                <Tab>Cancel</Tab>
              </TabList>

              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.all} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.upcoming} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.inqueue} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.inprocess} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.complete} />
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ marginTop: 10 }}>
                  <Table data={this.state.cancel} />
                </div>
              </TabPanel>
            
            </Tabs>
          )}
        </div>
      </>
    );
  }
}
