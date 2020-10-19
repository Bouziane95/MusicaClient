import React from "react";
import apiHandler from "../api/apiHandler";
import {Link} from "react-router-dom";
import { Card, Icon, Image } from 'semantic-ui-react'


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
            if (unit==="N") { dist = dist * 0.8684 }
            console.log(dist)
            return dist;
        }
    }

    rankLocation(){
        for(let i= 0; i<this.state.users.length; i++){
            this.locationDistance(this.state.users[i].location[0], this.state.users[i].location[1], this.state.users[i].location[0], this.state.users[i].location[1], "K")
        }

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
    }

    handleClick = (index) => {
        this.setState({selectedUser : index});
    }


  render() {
      console.log(this.state.users);
      this.rankLocation();
        return (
            <div>
                <h1>I'm the user page</h1>
                        <Card.Group>
                {this.state.users.map((user) => {
                    return (
                        <Link
                        key = {user._id}
                        to={`/users/${user._id}`}>
                        <Card>
                            <Image src={user.profilePicture} alt={user.firstName} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{user.firstName}</Card.Header>
                        <Card.Meta>
                         <span>{user.age} ans</span>
                        </Card.Meta>
                         <Card.Description>
                        {user.description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                    <a>
                        <Icon name='music' />
                        {user.instrumentsPlayed}
                    </a>
                    </Card.Content>
                 </Card>
                 </Link>
                    )
                })}
                 </Card.Group>
            </div>
        )
    }
}

export default Home;
