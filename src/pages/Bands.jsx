import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { withUser } from "../components/Auth/withUser";

class Bands extends Component {
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
    this.props.history.push("/bands/add");
  };

  render() {
    return (
      <div>
        <h1 className="centered-title"> BANDS </h1>

        {/* {this.props.context.isLoggedIn && (
          <Button color="yellow" onClick={this.redirectAddBand}>
            ADD BAND
          </Button>
        )} */}

        <Card.Group>
          {this.state.bands.map((band) => {
            return (
              <Link key={band._id} to={`/bands/${band._id}`}>
                <Card>
                  <Image
                    className="bandpage-div"
                    src={band.bandPicture}
                    alt="bandPic"
                    wrapped
                    ui={false}
                  />
                  <Card.Content textAlign="center">
                    <Icon name="music" color="yellow"></Icon>
                    <h3>{band.bandName}</h3>
                    <Card.Meta>
                      {" "}
                      Created by {band.bandBoss_id.firstName}{" "}
                      {band.bandBoss_id.lastName}
                    </Card.Meta>
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <Icon name="play" color="yellow"></Icon>
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
                    <Icon name="bullhorn" color="yellow"></Icon>
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
                    <Icon name="home" color="yellow"></Icon>
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

export default withUser(Bands);
