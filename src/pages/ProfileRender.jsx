import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import apiHandler from ".././api/apiHandler"
import {Button, Card, Icon, Image} from "semantic-ui-react"
import { withUser } from '../components/Auth/withUser';
import "../styles/profileRender.css"

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

    redirectEdit = () =>{
        this.props.history.push("/profile/" + this.props.match.params.id + "/edit")
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
            <div className="profileDiv">
            <div className = "profileCard">
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
                    <p>
                        <Icon name='music' />
                        {this.state.instrumentsPlayed}
                    </p>
                    </Card.Content>
                </Card>
            </div>    
            </div>
            
            <div className="buttonsEditDelete">
                <Button onClick={this.redirectEdit}>Edit my account</Button>
                <Button color= "red" onClick={this.deleteAccount}>Delete my account</Button>
            </div>

            </div>
            
        )
    }
}

export default withRouter(withUser(ProfileRender))
