import React from "react";
import apiHandler from "../api/apiHandler";
import {Link} from "react-router-dom";
import { Card, Icon, Image } from 'semantic-ui-react'
import {withUser} from "../components/Auth/withUser"

class Home extends React.Component {
  state = {
    users: [],
    selectedUser: null,
  };

    locationDistance(lat1, lon1, lat2, lon2, unit){
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            return dist;
        }
    }
  

    rankLocation(){
        const copyArray = [...this.state.users]

        for (let i= 0; i< copyArray.length; i++){
            if (copyArray[i]._id === this.props.context.user._id){
                const indexArr = copyArray.indexOf(copyArray[i])
                copyArray.splice(indexArr, 1)
            }
        }

       return  copyArray.sort((a,b) => {
    return this.locationDistance(this.props.context.user.location[0],this.props.context.user.location[1], a.location[0], a.location[1], "K") - this.locationDistance(this.props.context.user.location[0],this.props.context.user.location[1], b.location[0], b.location[1], "K")
        })
  }

   componentDidMount(){
        apiHandler.getAllUsers("/users").then((apiRes) => {
            this.setState({
                users: apiRes.data,
            });
        })
        .catch((apiErr) => {
            console.log(apiErr);
        });
    

  handleClick = (index) => {
    this.setState({ selectedUser: index });
  };

  render() {

    if(!this.props.context.user) return null;

    return (
      <div>
        <h1 className="centered-title">Users</h1>
        <Card.Group>
          {this.state.users.map((user) => {
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
                    <Card.Header>{user.firstName}</Card.Header>
                    <Card.Meta>
                      <span>{user.age} ans</span>
                    </Card.Meta>
                    <Card.Description>{user.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                      <Icon name="music" />
                      {user.instrumentsPlayed}
                    
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
}

export default withUser(Home);
