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
      rememberMe: false,
    };

    this.Password = this.Password.bind(this);

    this.Email = this.Email.bind(this);

    this.login = this.login.bind(this);

    this.rememberMe = this.rememberMe.bind(this);
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const email = rememberMe ? localStorage.getItem("email") : "";
    const password = rememberMe ? localStorage.getItem("password") : "";
    this.setState({ Email: email, Password: password, rememberMe });
    rememberMe ? document.getElementById("isRemember").checked = true : document.getElementById("isRemember").checked = false;
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }

  Password(event) {
    this.setState({ Password: event.target.value });
  }
  rememberMe(event) {
    this.setState({ rememberMe: event.target.checked });
    console.log(event.target.checked);
  }

  login(event) {
    const { Email, Password, rememberMe } = this.state;
    axios
      .post("https://reqres.in/api/login", {
        email: this.state.Email,
        password: this.state.Password,
      })
      .then((res) => this.setState({ token: res.data }))
      .then((res) => localStorage.setItem("rememberMe", rememberMe))
      .then((res) =>
        localStorage.setItem("email", this.state.rememberMe ? Email : "")
      )
      .then((res) =>
        localStorage.setItem("password", this.state.rememberMe ? Password : "")
      )

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
            value={this.state.Email}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            onChange={this.Password}
            value={this.state.Password}
          />
          <label>
            <input id="isRemember" type="checkbox" onChange={this.rememberMe}></input> Remember
            me
          </label>
          <button
            className="button-login"
            type="submit"
            value="Login"
            onClick={this.login}
          >
            Login
          </button>
          {this.state.loginError ? (
            <p style={{ color: "red" }}>Invalid username or password</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Login;
