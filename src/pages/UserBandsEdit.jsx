import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Button, Form } from "semantic-ui-react";
import DropDownMusic from "../components/Forms/DropDownMusic";
import DropDownLookingFor from "../components/Forms/DropDownLookingFor";
import { buildFormData } from "../Utils";
import UploadWidget from "../uploadWidget";
import "../styles/editBand.css";

export default class UserBandsEdit extends Component {
  state = {
    bandPicture: "",
    bandName: "",
    musicStyle: [],
    lookingFor: [],
    description: "",
    email: "",
    bandLocation: "",
    link: "",
  };

  componentDidMount() {
    apiHandler
      .getOneBand(this.props.match.params.id)
      .then((apiResponse) => {
        this.setState({
          bandName: apiResponse.data.bandName,
          musicStyle: apiResponse.data.musicStyle,
          lookingFor: apiResponse.data.lookingFor,
          description: apiResponse.data.description,
          email: apiResponse.data.email,
          bandLocation: apiResponse.data.bandLocation,
          link: apiResponse.data.link,
        });
      })
      .catch((error) => console.log(error));
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  updateBand = () => {
    const fd = new FormData();
    buildFormData(fd, this.state);

    apiHandler
      .updateBand("/bands/" + this.props.match.params.id, fd)
      .then((apiResponse) => {
        this.props.history.push(
          "/profile/" + this.props.match.params.id + "/bands"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateBand();
    // this.props.history.push("/profile/:id/bands");
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ bandPicture: file });
  };

  getValueFromDropDownMusicStyle = (data) => {
    this.setState({ musicStyle: data.value });
  };

  getValueFromDropDownLookingFor = (data) => {
    this.setState({ lookingFor: data.value });
  };

  render() {
    return (
      <div className="editBandDiv">
        <h1 className="centered-title">Edit my band</h1>

        <Form
          className="editBandForm"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Form.Field>
            <UploadWidget
              onFileSelect={this.handleFileSelect}
              name="bandPicture"
              id="bandPicture"
            >
              Upload new picture
            </UploadWidget>
          </Form.Field>

          <Form.Field>
            <label> Band Name</label>
            <input name="bandName" type="text" value={this.state.bandName} />
          </Form.Field>

          {/* ///DROPDOWN///  */}
          <Form.Field>
            <label> What style.s are you playing ?</label>
            <DropDownMusic
              callBack={this.getValueFromDropDownMusicStyle}
              value={this.state.musicStyle}
            />
          </Form.Field>

          <Form.Field>
            <DropDownLookingFor
              callBack={this.getValueFromDropDownLookingFor}
              value={this.state.lookingFor}
            />
          </Form.Field>
          {/* ///DROPDOWN/// */}

          <Form.Field>
            <label> Describe your band </label>
            <textarea
              name="description"
              type="string"
              value={this.state.description}
            />
          </Form.Field>

          <Form.Field>
            <label> Mail on which interested members can join you</label>
            <input name="email" type="string" value={this.state.email} />
          </Form.Field>

          <Form.Field>
            <label> Does your band already have a site or a youtube ?</label>
            <input name="link" type="string" value={this.state.link} />
          </Form.Field>

          <Button color="yellow" type="submit">
            LETS GO
          </Button>
        </Form>
      </div>
    );
  }
}
