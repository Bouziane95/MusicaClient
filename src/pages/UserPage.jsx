import React, { Component } from 'react';
import apiHandler from "../api/apiHandler";
import {Link} from "react-router-dom";

export default class UserPage extends Component {

    state = {
        user: null,
    };

    componentDidMount(){
        apiHandler.getOneUser(this.props.match.params.id).then((apiRes) => {
            this.setState({user: apiRes.data});
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <h1>User</h1>
                {this.state.user && (
                    <React.Fragment>
                        <img src={this.state.user.profilePicture} alt={this.state.user.firstName}/>
                        <p>{this.state.user.firstName}</p>
                        <p>{this.state.user.lastName}</p>
                        <p>{this.state.user.age}</p>
                        <p>{this.state.user.description}</p>
                        <p>{this.state.user.lookingFor}</p>
                        <p>{this.state.user.instrumentsPlayed}</p>
                        <p>{this.state.user.typesOfMusicPlay}</p>
                        <p>{this.state.user.favouriteBand}</p>
                        <p>{this.state.user.link}</p>
                        <p>{this.state.user.myBands}</p>
                    </React.Fragment>
                )}
                <Link to={`/`}>CLOSE</Link>
            </div>
        );
    }
}
