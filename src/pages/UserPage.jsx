import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "../styles/userPage.css";
import { Card, Image, Button, CardContent, Icon } from "semantic-ui-react";

export default class UserPage extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    apiHandler
      .getOneUser(this.props.match.params.id)
      .then((apiRes) => {
        this.setState({ user: apiRes.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  render() {
    
    return (
      <div className="container">
        <Card className="userpage-div" fluid>
          {this.state.user && (
            <React.Fragment>
              <CardContent>
                <Image src={this.state.user.profilePicture} alt="userpic" />
                <br></br>
                <br></br>
                <h2>
                  
                  {this.state.user.firstName} {this.state.user.lastName}
                </h2>
                <Card.Meta>
                  <p>{this.state.user.age} years old</p>
                  <p>{this.state.user.locationAddress}</p>
                </Card.Meta>
                <br></br>
                <Icon name="user outline" color="yellow"></Icon>
                <h3>Who am I ?</h3>
                <p class="simple-text">{this.state.user.description}</p>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="bullhorn" color="yellow"></Icon>
                <h3>What am I searching for ? </h3>

                {this.state.user.lookingFor.map((seekingFor) => {
                  return (
                    <div>
                      <p class="simple-text">- {seekingFor}</p>
                    </div>
                  );
                })}

                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="play" color="yellow"></Icon>
                <h3>What instrument.s do I play ? </h3>
                {this.state.user.instrumentsPlayed.map((instrument) => {
                  return (
                    <div>
                      <p class="simple-text">- {instrument}</p>
                    </div>
                  );
                })}

                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Icon name="heart" color="yellow"></Icon>
                <h3>My favourite band</h3>
                <p class="simple-text">{this.state.user.favouriteBand}</p>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                {this.state.user.link &&(
                <React.Fragment>
                <Icon name="smile outline" color="yellow"></Icon>
                <h3>Check my music ! </h3>
                <Link className="simple-text" to={this.state.user.link}>{this.state.user.link}</Link>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                </React.Fragment>
                )}
                <Icon name="mail" color="yellow"></Icon>
                <h3>Contact:</h3>
                <h4> {this.state.user.email}</h4>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
                <Button color="yellow">
                  <Link to={`/users`}>Close</Link>
                </Button>
              </CardContent>
            </React.Fragment>
          )}
        </Card>
      </div>
    );
  }
}
