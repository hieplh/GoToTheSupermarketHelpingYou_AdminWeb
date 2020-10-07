import React from 'react';
import './App.css';
import Login from './Login/Login';
import DashBoard from './DashBoard/DashBoard'
import TransitionDetails from './Transaction/TransactionDetail'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
       <Route path="/detail/:id" exact component={TransitionDetails}/> 
      <Route  path="/" exact component={sessionStorage.getItem("userToken")!=null ? DashBoard : Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={DashBoard}/>
    </Router>
    
  );
}

export default App;
