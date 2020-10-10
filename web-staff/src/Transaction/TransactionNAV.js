import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Table from "../Table/Table";
import SearchBar from "../SearchBar/SearchBar";
export default class TransactionNAV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      complete: [],
      uncomplete: [],
    };
  }

  componentDidMount() {
    axios.get("http://jsonplaceholder.typicode.com/todos").then((res) => {
      this.setState({ all: res.data });
      this.setState({
        complete: this.state.all.filter((order) => order.completed === true),
      });
      this.setState({
        uncomplete: this.state.all.filter((order) => order.completed === false),
      });
    });
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

  render() {
    return (
      <>
        <div style={{ marginLeft: 40, marginTop: 20, width: "95%" }}>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <form>
              <input
                style={{ width: 400 }}
                type="text"
                placeholder="Order Id, customer or shipper name,phone "
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <Tabs defaultIndex={0}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Upcoming</Tab>
              <Tab>Inqueue</Tab>
              <Tab>Processing</Tab>
              <Tab>Complete</Tab>
              <Tab>Cancel</Tab>
              <Tab>Time Out</Tab>
            </TabList>

            <TabPanel>
              <div style={{ marginTop: 10 }}>
                <Table data={this.state.all} />
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{ marginTop: 10 }}>
                <Table data={this.state.complete} />
              </div>
            </TabPanel>
            <TabPanel>
              <div style={{ marginTop: 10 }}>
                <Table data={this.state.uncomplete} />
              </div>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel>
              <div>
                <Tabs>
                  <TabList>
                    <Tab>Customer Cancel</Tab>
                    <Tab>Shipper Cancel</Tab>
                  </TabList>
                  <TabPanel>
                    <div style={{ marginTop: 10 }}>
                      <Table data={this.state.complete} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div style={{ marginTop: 10 }}>
                      <Table data={this.state.uncomplete} />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </TabPanel>
            <TabPanel></TabPanel>
          </Tabs>
        </div>
      </>
    );
  }
}
