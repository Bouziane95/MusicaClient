import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "../../styles/signin.css";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    return (
      
      <div className="signinDiv">
      <h1>Sign in</h1>
      <form className="signinForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="mymail@mail.fr" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" id="password" name="password" />
        <Button color='yellow'>Submit</Button>
      </form>
      </div>
      
    );
  }
}

export default withRouter(FormSignin);
