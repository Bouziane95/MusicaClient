import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Button, Form } from "semantic-ui-react";
import DropDownMusic from "../components/Forms/DropDownMusic";
import DropDownLookingFor from "../components/Forms/DropDownLookingFor";
import { buildFormData } from "../Utils";

export default class UserBandsEdit extends Component {
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

  componentDidMount() {
    apiHandler
      .getOneBand(this.props.match.params.id)
      .then((apiResponse) => {
        // console.log(apiResponse.data);
        this.setState({ band: apiResponse.data });
      })
      .catch((error) => console.log(error));
    // console.log(this.props.match.params.id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateBand();
    this.props.history.push("/profile/:id/bands");
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  updateClothes = () => {
    apiHandler
      .updateOne("/bands/" + this.props.match.params.id, this.state)
      .then(() => {
        this.props.history.push("/clothes");
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  render() {
    return (
      <div>
        <h1>Edit your band</h1>

        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Band Picture</label>
            <input name="bandPicture" type="file" />
          </Form.Field>
          <Form.Field>
            <label> Band Name</label>
            <input name="bandName" type="text" />
          </Form.Field>

          {/* ///DROPDOWN///  */}
          <DropDownMusic callBack={this.getValueFromDropDownMusicStyle} />
          <DropDownLookingFor callBack={this.getValueFromDropDownLookingFor} />
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
