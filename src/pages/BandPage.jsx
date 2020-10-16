import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import React, { Component } from "react";

export default class Bandpage extends Component {
  state = {
    bands: null,
  };

  componentDidMount() {
    apiHandler
      .getOneBand(this.props.match.params.id)
      .then((apiResponse) => {
        // console.log(apiResponse.data);
        this.setState({ bands: apiResponse.data });
      })
      .catch((error) => console.log(error));
    // console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {this.state.bands && (
          <React.Fragment>
            <img
              className="bandPic"
              src={this.state.bands.bandPicture}
              alt="bandImage"
            />
            <h2>{this.state.bands.bandName}</h2>
            <h3>{this.state.bands.musicStyle}</h3>
            <h4>{this.state.bands.groupMembers}</h4>
            <h5>{this.state.bands.lookingFor}</h5>
            <h5>{this.state.bands.location}</h5>
            <p>{this.state.bands.description}</p>
            <p>{this.state.bands.email}</p>
            {/* <p>{this.state.bandBoss_id.firstName}</p> */}
            {/* <a>{this.state.bands.link}</a> */}
            <Link>{this.state.bands.link}</Link>

            <Link to={`/bands`}>CLOSE</Link>

          </React.Fragment>
        )}
      </div>
    );
  }
}
