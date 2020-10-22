import React from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { withUser } from "../components/Auth/withUser";
import SearchBar from ".././components/SearchBar";

class Home extends React.Component {
  state = {
    users: [],
    selectedUser: null,
    filteredUsers: [],
    search:[],
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

  rankLocation =() => {
    if (!this.props.context.user) return this.state.filteredUsers;
    const copyArray = [...this.state.filteredUsers];

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
  
  componentDidMount() {
    apiHandler
      .getAllUsers("/users")
      .then((apiRes) => {
        this.setState({
          users: apiRes.data,
          filteredUsers: apiRes.data
        });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  handleClick = (index) => {
    this.setState({ selectedUser: index });
  };

  handleFilter = (value) =>{
    if(value.length === 0){
      this.setState({
        filteredUsers: this.state.users
      })
      return;
    }
      this.setState({
        filteredUsers: this.state.users.filter((user) => {
          return user.instrumentsPlayed.reduce((acc,instru)=>acc || value.includes(instru) ,false)
        })
      })
  }

  render() {


    console.log(this.rankLocation(),"this is location")

    return (

      <div>
        <h1 className="centered-title ">Users</h1>
      <div className="lookingFor"><p> What are you looking for ?</p> </div>

        <div id="search">
        <SearchBar handleCheckBox={this.handleFilter}></SearchBar>
        </div>

        {/* <div className="gradient-line"></div> */}

        <Card.Group>
          {this.rankLocation().map((user) => {
            return (
              <Link key={user._id} to={`/users/${user._id}`}>
                <Card>
                  <Image
                    id="bandpage-div"
                    className="bandpage-div"
                    src={user.profilePicture}
                    alt={user.firstName}
                    wrapped
                    ui={false}
                  />
                  <Card.Content textAlign="center">
                    <Icon name="user outline" color="yellow"></Icon>
                    <h2>
                      {user.firstName} {user.lastName}{" "}
                    </h2>
                    <Card.Meta>
                      <span>{user.age} years old</span>
                    </Card.Meta>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <Icon name="play" color="yellow"></Icon>
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
                    <Icon name="bullhorn" color="yellow"></Icon>
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
                    <Icon name="heart" color="yellow"></Icon>
                    <h4>My favourite band:</h4>
                    <p>{user.favouriteBand}</p>
                    <br></br>
                    <hr className="orange-line"></hr>
                    <br></br>
                    <Icon name="home" color="yellow"></Icon>
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
