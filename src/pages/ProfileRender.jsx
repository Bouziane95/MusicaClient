import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import apiHandler from ".././api/apiHandler"
import {Button, Card, Icon, Image} from "semantic-ui-react"
import { withUser } from '../components/Auth/withUser';

class ProfileRender extends Component {
    

    state={
        firstName : "",
        lastName: "",
        age : "",
        profilePicture: "",
        description: "",
        lookingFor: [],
        instrumentsPlayed: [],
    }


    componentDidMount(){
        console.log(this.state)
        apiHandler.getOneUser(this.props.match.params.id).then((apiRes) => {      
            this.setState({
                firstName: apiRes.data.firstName,
                lastName: apiRes.data.lastName,
                age: apiRes.data.age,
                description: apiRes.data.description,
                lookingFor: apiRes.data.lookingFor,
                instrumentsPlayed: apiRes.data.instrumentsPlayed,
                profilePicture: apiRes.data.profilePicture,
            })
        })
        .catch((error) => {
            console.log(error)
        })      
    }

    deleteAccount = () =>{
        const { context } = this.props;

        apiHandler.deleteUser("/users/" + this.props.match.params.id, this.state)
        .then(() => {
            apiHandler.logout().then(() => {
                context.removeUser();
                this.props.history.push("/")
            })
            .catch((error) => {
                console.log(error)
            }) 
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>My Profile</h1>
                <Card>
                    <Image src = {this.state.profilePicture} alt= {this.state.firstName} wrapped ui = {false} />
                    <Card.Content>
                        <Card.Header>{this.state.firstName}</Card.Header>
                        <Card.Meta>
                        <span>{this.state.age} ans</span>
                        </Card.Meta>
                        <Card.Description>
                        {this.state.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='music' />
                        {this.state.instrumentsPlayed}
                    </a>
                    </Card.Content>
                </Card>
                <Button onClick={this.deleteAccount}>Delete my account</Button>
            </div>
        )
    }
}

export default withRouter(withUser(ProfileRender))
