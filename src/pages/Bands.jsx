import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

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
        <h1 className="centered-title"> BANDS </h1>
        <Link to={`/bands/add`}>ADD BAND</Link>
        <Card.Group>
          {this.state.bands.map((band) => {
            return (
              <Link key={band._id} to={`/bands/${band._id}`}>
                <Card>
                  <Image
                    className="bandPic"
                    src={band.bandPicture}
                    alt="bandPic"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{band.bandName}</Card.Header>
                    <Card.Meta>
                      {" "}
                      Created by {band.bandBoss_id.firstName}{" "}
                      {band.bandBoss_id.lastName}
                    </Card.Meta>
                    
                    <p>The band likes to play: {band.musicStyle}</p>
                    <h4>The band is looking for: {band.lookingFor}</h4>
                    <h5>{band.location}</h5>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}
