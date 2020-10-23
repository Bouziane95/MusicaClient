import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { withUser } from "../components/Auth/withUser";

class UserBands extends Component {

  state = {
    bands: [],
  };

  componentDidMount() {
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

  deleteBand = (bandId) => {
    apiHandler
      .deleteBand("/bands/" + bandId)
      .then((apiRes) => {
        console.log(apiRes.data);
        this.props.history.push("/profile/" + this.props.match.params.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  redirectEditBand = () => {
    this.props.history.push("/profile/"+ this.state.bands._id + "/bands/edit")
  }

  redirectAddBand = () => {
    this.props.history.push("/bands/add");
  };

  render() {
    console.log(this.props.context.isLoggedIn);
    return (
      <div>
        <h1 className="centered-title"> MY BANDS</h1>

        {this.props.context.isLoggedIn && (
        <Button color="yellow" onClick={this.redirectAddBand}>
            Add a Band
          </Button>
        )}

        <Card.Group>
          {this.state.bands.map((band) => {
            return (
              <Link key={band._id} to={`/bands/${band._id}`}>
                <Card className="bandpage-div" fluid>
                  <Image
                    className="bandpage-div"
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
                    <br></br>

                    <hr className="orange-line"></hr>
                    <br></br>
                    <Button color="yellow">
                      <Link to={`/profile/${band._id}/bands/edit`}>
                        {" "}
                        Edit my band{" "}
                      </Link>
                    </Button>
                    <br></br>
                    <br></br>
                    <Button color="red" onClick={() => this.deleteBand(band._id)}>
                      Delete my band
                    </Button>
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



export default withUser(UserBands);