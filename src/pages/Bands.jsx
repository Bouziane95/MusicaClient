import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";

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

  redirectAddBand = () => {
    this.props.history.push("/bands/add")
  }

  render() {
    console.log(this.state.bands);
    return (
      <div>
        <h1 className="centered-title"> BANDS </h1>
        <Button color="yellow" onClick={this.redirectAddBand}>ADD BAND</Button>
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

                    <hr className="orange-line"></hr>
                    <br></br>
                    <h4>This band likes to play :</h4>

                    {band.musicStyle.map((genre) => {
                      return (
                        <div>
                          <span>- </span>
                          <span>{genre}</span>
                        </div>
                      );
                    })}

                    <br></br>
                    <hr className="orange-line"></hr>

                    <br></br>
                    <h4>This band is looking for a :</h4>

                    {band.lookingFor.map((instrument) => {
                      return (
                        <div>
                          <span>- </span>
                          <span>{instrument}</span>
                        </div>
                      );
                    })}
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <h4>This band is located in :</h4>
                    <span>{band.bandLocation}</span>
                    <br></br>


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
