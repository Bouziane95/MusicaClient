import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import DropDownLookingFor from '../Forms/DropDownLookingFor'
import DropDownInstruments from "../Forms/DropDownInstruments"

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    profilePicture: "https://thevoicefinder.com/wp-content/themes/the-voice-finder/images/default-img.png",
    description: "",
    lookingFor: [],
    instrumentsPlayed:[],
  };

  getValueFromDropDown = (data) => {
    console.log(data)
    this.setState({lookingFor:  data});
  }

  getValueFromDropDownInstruments = (value) => {
    this.setState({instrumentsPlayed: [...this.state.instrumentsPlayed, value]});
  }

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

    apiHandler.signup(fd)
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
      <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
      <Form.Field>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" name="profilePicture" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" placeholder="Vous devez avoir minimum 18 ans" min="18" max="100" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" name="description" />
      </Form.Field>

        <DropDownLookingFor callBack = {this.getValueFromDropDown} />
        <br/>
        <DropDownInstruments callback = {this.getValueFromDropDownInstruments}/>
        <br/>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(FormSignup);
