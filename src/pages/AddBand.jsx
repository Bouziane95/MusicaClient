import React, { Component } from "react";
import apiHandler from "../api/apiHandler";

export default class AddBand extends Component {
  state = {
    bandPicture: "",
    // bandBoss_id: {Schema.Types.ObjectId, ref: "User" },
    bandName: "",
    musicStyle: [""],
    groupMembers: [""],
    lookingFor: [""],
    description: "",
    email: "",
    link: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .createBand("/bands", this.state)
      .then((apiRes) => {
        // console.log(apiRes);
      })
      .catch((apiError) => {
        // console.log(apiError);
      });
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  render() {
    return (
      <div>
        <h1> Add A BAND</h1>

        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >

          <label> Band Picture</label>
          <input name="bandPicture" type="file" id="bandPicture" />

          <label> Band Name</label>
          <input name="bandName" type="text" />

          <label for="musicStyle">What style does your band play ?</label>

          <select name="musicStyle" id="bandStyleSelect">
            <option value="Rock">Rock</option>
            <option value="Rap">Rap</option>
            <option value="Jazz">Jazz</option>
            <option value="Blues">Blues</option>
            <option value="Metal">Metal</option>
            <option value="Funk">Funk</option>
          </select>

          <label for="groupMembers">
            How many group members are you already{" "}
          </label>

          <select name="groupMembers" id="groupMembersSelect">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label for="lookingFor">What are you looking for ? </label>

          <select name="lookingFor" id="lookingFor">
            <option value="Guitarist">Guitarist</option>
            <option value="Bassist">Bassist</option>
            <option value="Drummer">Drummer</option>
            <option value="Singer">Singer</option>
            <option value="Bolosse">Bolosse</option>
          </select>

          <label> Describe your band :)</label>
          <input name="Description" type="text" />

          <label> Mail on which interested members can join you</label>
          <input name="email" type="string" />

          <label> Does your band already have a site or a youtube ?</label>
          <input name="link" type="string" />

          <button> LETS GO</button>
        </form>
      </div>
    );
  }
}
