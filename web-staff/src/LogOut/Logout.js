import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Welcome from '../Welcome/Welcome'
import '../LogOut/LogOut.css'
class Logout extends Component {
  constructor() {
    super();

    this.state = {
        navigate:false,
    };

    this.logOut = this.logOut.bind(this);
  }

  logOut = () => {
    sessionStorage.removeItem("userToken");
    this.setState({navigate:true});
  };

  render() {
    if (this.state.navigate) {
        
        return (
          <Redirect to={{ pathname: "/login"}} />
        );
      }
    return (
      <div >
         <Welcome name={"Phuong Nguyen"} /> <br/> 
        <button  onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
}

export default Logout;
