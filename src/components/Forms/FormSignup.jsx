import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Button, Form } from 'semantic-ui-react'
import DropDownLookingFor from '../Forms/DropDownLookingFor'
import DropDownInstruments from "../Forms/DropDownInstruments"
import {buildFormData} from "../../Utils"

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
    this.setState({lookingFor: data.value});
  }

  getValueFromDropDownInstruments = (data) => {
    this.setState({instrumentsPlayed: data.value});
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
    buildFormData(fd, this.state);

    apiHandler.signup(fd)
    .then(() => {
      this.props.history.push("/signin");
    })
    .catch((apiError) => {
      console.log(apiError);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createUser();
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
        <DropDownInstruments callBack = {this.getValueFromDropDownInstruments}/>
        <br/>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    );
  }
}

export default withRouter(FormSignup);
