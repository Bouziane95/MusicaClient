import React from "react";
import apiHandler from "../api/apiHandler";
import {Link} from "react-router-dom";
import { Card, Icon, Image } from 'semantic-ui-react'


class Home extends React.Component {

  state = {
        users: [],
        selectedUser: null,
    };

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
                    <a>x@
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
