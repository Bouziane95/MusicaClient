import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import apiHandler from ".././api/apiHandler";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { withUser } from "../components/Auth/withUser";
import "../styles/profileRender.css";

class ProfileRender extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    profilePicture: "",
    description: "",
    lookingFor: [],
    instrumentsPlayed: [],
    favouriteBand: "",
    link: "",
    email: "",
    locationAddress: "",
  };

  componentDidMount() {
    console.log(this.state);
    apiHandler
      .getOneUser(this.props.match.params.id)
      .then((apiRes) => {
        this.setState({
          firstName: apiRes.data.firstName,
          lastName: apiRes.data.lastName,
          age: apiRes.data.age,
          description: apiRes.data.description,
          lookingFor: apiRes.data.lookingFor,
          instrumentsPlayed: apiRes.data.instrumentsPlayed,
          profilePicture: apiRes.data.profilePicture,
          favouriteband: apiRes.data.favouriteBand,
          link: apiRes.data.link,
          email: apiRes.data.email,
          locationAddress: apiRes.data.locationAddress,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  redirectEdit = () => {
    this.props.history.push("/profile/" + this.props.match.params.id + "/edit");
  };

  deleteAccount = () => {
    const { context } = this.props;

    apiHandler
      .deleteUser("/users/" + this.props.match.params.id, this.state)
      .then(() => {
        apiHandler
          .logout()
          .then(() => {
            context.removeUser();
            this.props.history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <Card className="profilePage-div" fluid>
          <Card.Content>
            <Image src={this.state.profilePicture} alt={this.state.firstName} />
            <br></br>
            <br></br>
            <h2>
              {this.state.firstName} {this.state.lastName}
            </h2>
            <Card.Meta>
              <p>{this.state.age} years old</p>
              <p>{this.state.locationAddress}</p>
            </Card.Meta>
            <br></br>
            <Icon name="user outline" color="yellow"></Icon>
            <h3>Who am I ?</h3>
            <p class="simple-text">{this.state.description}</p>
            <br></br>
            <hr className="orange-line"></hr>
            <br></br>
            <Icon name="bullhorn" color="yellow"></Icon>
            <h3>What am I searching for ?</h3>
            {this.state.lookingFor.map((seekingFor) => {
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
            <h3>What instrument.s do I play ?</h3>
            {this.state.instrumentsPlayed.map((instrument) => {
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
            <p class="simple-text">{this.state.favouriteBand}</p>
            <br></br>
            <hr className="orange-line"></hr>
            <br></br>
            {this.state.link && (
              <React.Fragment>
                <Icon name="smile outline" color="yellow"></Icon>
                <h3>Check my music ! </h3>
                <Link className="simple-text" to={this.state.link}>
                  {this.state.link}
                </Link>
                <br></br>
                <hr className="orange-line"></hr>
                <br></br>
              </React.Fragment>
            )}
            <Icon name="mail" color="yellow"></Icon>
            <h3>Contact:</h3>
            <h4> {this.state.email}</h4>
            <br></br>
                <hr className="orange-line"></hr>
                <br></br>
            <div className="buttonsEditDelete">   
                <Button>
                    <Link to={"/users"}>Close</Link>
                </Button>
                <Button color="yellow" onClick={this.redirectEdit}>Edit my account</Button>
                <Button color= "red" onClick={this.deleteAccount}>Delete my account</Button>
    </div>
          </Card.Content>
        </Card>
            </div>
        )
            }
    
  }


export default withRouter(withUser(ProfileRender));
