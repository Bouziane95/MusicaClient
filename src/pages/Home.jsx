import React from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { withUser } from "../components/Auth/withUser";

class Home extends React.Component {
  state = {
    users: [],
    selectedUser: null,
  };

  locationDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      return dist;
    }
  }

  rankLocation() {
    if (!this.props.context.user) return this.state.users;
    const copyArray = [...this.state.users];

    for (let i = 0; i < copyArray.length; i++) {
      if (copyArray[i]._id === this.props.context.user._id) {
        const indexArr = copyArray.indexOf(copyArray[i]);
        copyArray.splice(indexArr, 1);
      }
    }
    return copyArray.sort((a, b) => {
      return (
        this.locationDistance(
          this.props.context.user.location[0],
          this.props.context.user.location[1],
          a.location[0],
          a.location[1],
          "K"
        ) -
        this.locationDistance(
          this.props.context.user.location[0],
          this.props.context.user.location[1],
          b.location[0],
          b.location[1],
          "K"
        )
      );
    });
  }

  // componentDidMount() {
  //   apiHandler
  //     .getAllUsers("/users")
  //     .then((apiRes) => {
  //       this.setState({
  //         users: apiRes.data,
  //       });
  //     })
  //     .catch((apiErr) => {
  //       console.log(apiErr);
  //     });
  // }

  componentDidMount() {
    apiHandler
      .getAllUsers("/users")
      .then((apiRes) => {
        console.log(apiRes.data);
        this.setState({
          users: apiRes.data,
        });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  handleClick = (index) => {
    this.setState({ selectedUser: index });
  };

  render() {
    console.log("LE STATE")
    console.log(this.state)
    return (
      <div>
        <h1 className="centered-title floating"> ♬ Users ♬</h1>
        <Card.Group>
          {this.rankLocation().map((user) => {
            return (
              <Link key={user._id} to={`/users/${user._id}`}>
                <Card>
                  <Image
                    src={user.profilePicture}
                    alt={user.firstName}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>
                      {user.firstName} {user.lastName}{" "}
                    </Card.Header>
                    <Card.Meta>
                      <span>{user.age} years old</span>
                    </Card.Meta>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <h4>I am playing :</h4>
                    {user.instrumentsPlayed.map((instrument) => {
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
                    <h4>I am looking for a :</h4>

                    {user.lookingFor.map((seekingInstrument) => {
                      return (
                        <div>
                          <span>- </span>
                          <span>{seekingInstrument}</span>
                        </div>
                      );
                    })}
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <h4>My favourite band:</h4>
                    <p>{user.favouriteBand}</p>
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <h4>Located in:</h4>
                    {user.locationAddress}
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

export default withUser(Home);
