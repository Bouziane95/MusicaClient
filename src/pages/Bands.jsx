import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";


export default class Bands extends Component {
  state = {
    bands: [],
  };

  componentDidMount() {
    apiHandler
      .getAllBands("/bands")
      .then((apiRes) => {
        this.setState({ bands: apiRes.data });
        // console.log(apiRes)
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  render() {
    console.log(this.state.bands);
    return (
      <div>
        <h1> BANDS SECTION</h1>
        <Link to={`/bands/add`}>ADD BAND</Link>
        {this.state.bands.map((band) => (
          <div>
            <img
              className="bandPic"
              src={band.bandPicture}
              alt="bandPic"
            />
            <h2>{band.bandBoss_id.firstName} {band.bandBoss_id.lastName}</h2>

            <Link key={band.bandName} to={`/bands/${band._id}`}>
              {band.bandName}
            </Link>
            <h3>{band.musicStyle}</h3>
            <h4>{band.lookingFor}</h4>
            <h5>{band.location}</h5>
          </div>
        ))}
      </div>
    );
  }
}
