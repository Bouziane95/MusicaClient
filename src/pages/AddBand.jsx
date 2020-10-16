import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Button, Form} from "semantic-ui-react";
import DropDownMusic from "../components/Forms/DropDownMusic";
import DropDownLookingFor from "../components/Forms/DropDownLookingFor";
import {buildFormData} from "../Utils"

export default class AddBand extends Component {
  state = {
    bandPicture: "",
    bandBoss_id: [],
    bandName: "",
    musicStyle: [],
    lookingFor: [],
    description: "",
    email: "",
    link: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData()
    buildFormData(fd, this.state)
    
    apiHandler
      .createBand(fd)
      .then((apiRes) => {
        console.log(apiRes);
        this.props.history.push("/bands");
        
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === "file" ? event.target.files[0] : event.target.value;
    console.log(name, value)
    this.setState({ [name]: value });
  };


  getValueFromDropDownMusicStyle = (data) => {
    
    this.setState({musicStyle: data.value});
  }

  getValueFromDropDownLookingFor = (data) => {
    console.log(data)
    this.setState({lookingFor: data.value});
  }

  render() {
    return (
      <div>
        <h1> ADD A BAND</h1>

        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Band Picture</label>
            <input name="bandPicture" type="file"/>
          </Form.Field>
          <Form.Field>
            <label> Band Name</label>
            <input name="bandName" type="text" />
          </Form.Field>
          

          {/* ///DROPDOWN///  */}
          <DropDownMusic callBack={this.getValueFromDropDownMusicStyle} />
          <DropDownLookingFor callBack={this.getValueFromDropDownLookingFor}  />
          {/* ///DROPDOWN/// */}
          
          <Form.Field>
            <label> Describe your band </label>
            <input name="description" type="string" />
          </Form.Field>

          <Form.Field>
            <label> Mail on which interested members can join you</label>
            <input name="email" type="string" />
          </Form.Field>

          <Form.Field>
            <label> Does your band already have a site or a youtube ?</label>
            <input name="link" type="string" />
          </Form.Field>

          <Button type="submit">LETS GO</Button>
        </Form>
      </div>
    );
  }
}
