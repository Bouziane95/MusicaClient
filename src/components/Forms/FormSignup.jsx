import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    profilePicture: "",
    description: "",
    lookingFor: [""],
    instrumentsPlayed:[""],
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  createUser(){

    const fd = new FormData();
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);
    fd.append("firstName", this.state.firstName);
    fd.append("lastName", this.state.lastName);
    fd.append("age", this.state.age);
    fd.append("profilePicture", this.state.profilePicture);
    fd.append("description", this.state.description);
    fd.append("lookingFor", this.state.lookingFor);

    apiHandler.createUser("/users", fd)
    .then(() => {
      this.props.history.push("/signin");
    })
    .catch((apiError) => {
      console.log(apiError);
    });
  }

  updateUser(){
    console.log("update le form")
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.action === "edit"){
      this.updateUser();
    } else {
      this.createUser();
    }
  };

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" name="profilePicture" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" />
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" />
        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" name="description" />

        <select name="lookingFor" id="lookingFor">
          <option value="">What are you looking for ?</option>
          <option value="Guitariste">Guitariste</option>
          <option value="Batteur">Batteur</option>
          <option value="Basse">Basse</option>
        </select>

        <select name="instrumentsPlayed" id="instrumentsPlayed">
          <option value="">What instruments you play ?</option>
          <option value="Guitare">Guitare</option>
          <option value="Batterie">Batterie</option>
          <option value="Basse">Basse</option>
        </select>

        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
