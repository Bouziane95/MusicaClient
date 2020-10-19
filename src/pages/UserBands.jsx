import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

export default class UserBands extends Component {
  state = {
    bands: [],
  };

  componentDidMount() {
    console.log("i'm here");
    console.log(this.props.match.params.id);
    apiHandler
      .getUserBands("/users/me/bands")
      .then((apiRes) => {
        this.setState({ bands: apiRes.data });
        console.log("je suis ici");
        console.log(apiRes.data);
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  render() {
    return (
      <div>
        <h1> MY BANDS</h1>
        {this.state.bands.map((band) => (
          <div>
            <img className="bandPic" src={band.bandPicture} alt="bandPic" />
            <h2>
              {band.bandBoss_id.firstName} {band.bandBoss_id.lastName}
            </h2>

            <Link key={band.bandName} to={`/bands/${band._id}`}>
              {band.bandName}
            </Link>
            <h3>{band.musicStyle}</h3>
            <h4>{band.lookingFor}</h4>
            <h5>{band.location}</h5>
            <Link to={`/profile/bands/${band._id}/edit`}> EDIT </Link>
          </div>
        ))}
      </div>
    );
  }
}
