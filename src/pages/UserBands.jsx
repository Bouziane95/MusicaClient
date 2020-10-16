import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

export default class UserBands extends Component {
  componentDidMount() {
    apiHandler.getUserItems().then((data) => {
      this.setState({ userItems: data });
    });
  }

  render() {
    return (
      <div>
        <h1>I'm the User Bands pages</h1>
      </div>
    );
  }
}
