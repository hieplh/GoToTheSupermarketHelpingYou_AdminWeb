import React from "react";
import "./App.css";
import Login from "./Login/Login";
import DashBoard from "./DashBoard/DashBoard";
import Account from "./Account/Account";
import Request from "./Request/Request";
import TransitionDetails from "./Transaction/TransactionDetail";
import UserDetail from "./UserDetail/UserDetail";
import CostShipping from "./CostShipping/CostShipping";
import Income from "./Income/Income"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/detail/:id" exact component={TransitionDetails} />
      <Route path="/user/:type/:id" exact component={UserDetail} />
      <Route
        path="/"
        exact
        component={
          sessionStorage.getItem("userToken") != null ? DashBoard : Login
        }
      />
      <Route path="/login" component={Login} />
      <Route path="/home" component={DashBoard} />
      <Route path="/account" component={Account} />
      <Route path="/requests" component={Request} />
      <Route path="/cost" component={CostShipping} />
      <Route path="/income" component={Income} /> 
    </Router>
  );
}

export default App;
