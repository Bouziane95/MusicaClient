import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Button, Form } from 'semantic-ui-react'
import DropDownLookingFor from '../Forms/DropDownLookingFor'
import DropDownInstruments from "../Forms/DropDownInstruments"
import {buildFormData} from "../../Utils"
import AutoComplete from "../../pages/AutoComplete"
import "../../styles/signup.css"

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    profilePicture: "https://thevoicefinder.com/wp-content/themes/the-voice-finder/images/default-img.png",
    description: "",
    lookingFor: [],
    instrumentsPlayed:[],
    location:[],
    link:"",
    sex:"",
    locationAddress: "",
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

  handlePlace = (place) => {
    const locationCoordinates = place.geometry.coordinates;
    const locationAddres = place.place_name;
    this.setState({ location: locationCoordinates, locationAddress: locationAddres });
  };

  render() {
    console.log(this.state)
    return (
    <div className="signupDiv">
    <h1>Sign up</h1>
      <Form className="signupForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
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
        <label htmlFor="sexe">Gender</label>
        <select name="sex" id="sex">
          <option name="sex" id="sex" value="W">Whatever</option>
          <option name="sex" id="sex" value="M">Male</option>
          <option name="sex" id="sex" value="F">Female</option>
        </select>
      </Form.Field>

      <Form.Field>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" placeholder="Vous devez avoir minimum 18 ans" min="18" max="100" />
      </Form.Field>

      <Form.Field>
        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" name="description" />
      </Form.Field>
      
      <Form.Field>
        <label htmlFor="location">Where do you live ?</label>
        <AutoComplete name="location" id ="location" onSelect= {this.handlePlace}/>
      </Form.Field>

      <Form.Field>
        <label htmlFor="favouriteBand">What's your favourite band ?</label>
        <input type="text" id="favouriteBand" name="favouriteBand" />
      </Form.Field>

      <Form.Field>
      <label htmlFor="lookingFor">What are you looking for ?</label>
      <DropDownLookingFor value={this.state.lookingFor} callBack = {this.getValueFromDropDown} />
      </Form.Field>
      
      <Form.Field>
      <label htmlFor="lookingFor">What instrument.s do you play ?</label>
      <DropDownInstruments value={this.state.instrumentsPlayed} callBack = {this.getValueFromDropDownInstruments}/>
      </Form.Field>

      <Form.Field>
        <label htmlFor="link">Link</label>
        <input type="text" id="link" name="link" placeholder="https://example.com"/>
      </Form.Field>

      <Button type="submit" value="Submit" color='yellow'>Submit</Button>
    </Form>
    </div>
    
    );
  }
}

export default withRouter(FormSignup);
