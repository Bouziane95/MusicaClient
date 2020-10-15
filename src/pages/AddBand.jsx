import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Button, Form} from "semantic-ui-react";
import DropDownMusic from "../components/Forms/DropDownMusic";
import DropDownInstruments from "../components/Forms/DropDownInstruments";

export default class AddBand extends Component {
  state = {
    bandPicture: "",
    // bandBoss_id: {Schema.Types.ObjectId, ref: "User" },
    bandName: "",
    musicStyle: [],
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
    const name = event.target.name;
    const value = event.target.value;
    // event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  getValueFromDropDown= (value)=> {
this.setState({musicStyle: [...this.state.musicStyle, value]});
  }
  render() {
    return (
      <div>
        <h1> Add A BAND</h1>

        <Form onChange={this.handleChange} onClick={this.handleSubmit}>
          <Form.Field>
            <label>Band Picture</label>
            <input name="bandPicture" type="file" id="bandPicture" />
          </Form.Field>
          <Form.Field>
            <label> Band Name</label>
            <input name="bandName" type="text" />
          </Form.Field>
          {/* <Form.Field>
            <label for="musicStyle">What style does your band play ?</label>
            <select name="musicStyle" id="bandStyleSelect">
              <option value="Rock">Rock</option>
              <option value="Rap">Rap</option>
              <option value="Jazz">Jazz</option>
              <option value="Blues">Blues</option>
              <option value="Metal">Metal</option>
              <option value="Funk">Funk</option>
            </select>
          </Form.Field> */}

          {/* ///DROPDOWN///  */}
          <DropDownMusic callBack={this.getValueFromDropDown} />
          <DropDownInstruments />
          {/* ///DROPDOWN/// */}

          {/* <Form.Field>
            <label for="lookingFor">What are you looking for ? </label>

            <select name="lookingFor" id="lookingFor">
              <option value="Guitarist">Guitarist</option>
              <option value="Bassist">Bassist</option>
              <option value="Drummer">Drummer</option>
              <option value="Singer">Singer</option>
              <option value="Bolosse">Bolosse</option>
            </select>
          </Form.Field> */}

          <Form.Field>
            <label> Describe your band :)</label>
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
