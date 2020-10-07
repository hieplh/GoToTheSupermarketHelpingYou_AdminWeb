import React from "react";
import logo from "../images/logo.png";
import { Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      Email: "",

      Password: "",
      token: "",
      loginError: false,
    };

    this.Password = this.Password.bind(this);

    this.Email = this.Email.bind(this);

    this.login = this.login.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }

  Password(event) {
    this.setState({ Password: event.target.value });
  }

  login(event) {
    axios
      .post("https://reqres.in/api/login", {
        email: this.state.Email,
        password: this.state.Password,
      })
      .then((res) => this.setState({ token: res.data }))
      .catch((err) => this.setState({ loginError: true }));
  }

  

  render() {
    
    if (this.state.token !== "") {
      sessionStorage.setItem("userToken", this.state.token);
      return <Redirect to={{ pathname: "/home", state: this.state.token }} />;
    }

    return (
      <div className="form-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="login-form">
          <input
            className="form-input"
            type="text"
            placeholder="User Name"
            onChange={this.Email}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            onChange={this.Password}
          />
          <button
            className="button-login"
            type="submit"
            value="Login"
            onClick={this.login}
          >
            Login
          </button>
          {this.state.loginError ? <p style={{ color: "red" }}>Invalid username or password</p> : null}
        </div>
      </div>
    );
  }
}

export default Login;
