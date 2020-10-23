import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import React, { Component } from "react";
import "../styles/bandPage.css";
import { Card, Image, Button, CardContent, Icon } from "semantic-ui-react";

export default class Bandpage extends Component {
  state = {
    bands: null,
  };

  componentDidMount() {
    apiHandler
      .getOneBand(this.props.match.params.id)
      .then((apiResponse) => {
        this.setState({ bands: apiResponse.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <Card className="bandpage-div" fluid>
          {this.state.bands && (
            <React.Fragment>
              <br></br>
              <Image
                className="bandPic"
                src={this.state.bands.bandPicture}
                alt="bandImage"
              />
              <br></br>
              <CardContent>
              <Icon name="music" color="yellow"></Icon>
                <h2>{this.state.bands.bandName}</h2>
                <Card.Meta>
                  {" "}
                  <h5>{this.state.bands.bandLocation}</h5>
                </Card.Meta>
                <br></br>

                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="play" color="yellow"></Icon>
                <h3>This band likes to play:</h3>

                {this.state.bands.musicStyle.map((genre) => {
                  return (
                    <div>
                      <p class="simple-text">- {genre}</p>
                    </div>
                  );
                })}

                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="bullhorn" color="yellow"></Icon>
                <h3>This band is looking for a:</h3>
                {this.state.bands.lookingFor.map((instrument) => {
                  return (
                    <div>
                      <p class="simple-text">- {instrument}</p>
                    </div>
                  );
                })}
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="info circle" color="yellow"></Icon>
                <h3>Who are they ?</h3>
                <p className="justify-text">{this.state.bands.description}</p>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="mail" color="yellow"></Icon>
                <h3>Contact:</h3>
                <h4> {this.state.bands.email}</h4>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                {this.state.bands.link &&(
                  <React.Fragment>
                    <Icon name="smile outline" color="yellow"></Icon>
                    <h3>Check our music!</h3>
                    <Link to={this.state.bands.link}>{this.state.bands.link}</Link>
                    <br></br>
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                  </React.Fragment>
                )}
                <Button color="yellow">
                  {" "}
                  <Link to={`/bands`}>CLOSE</Link>
                </Button>
              </CardContent>
            </React.Fragment>
          )}
        </Card>
      </div>
    );
  }
}
