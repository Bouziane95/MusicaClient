import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {UserContext} from "../Auth/UserContext"
import apiHandler from "../../api/apiHandler"
import {Button, Form} from "semantic-ui-react"
import DropDownLookingFor from "../Forms/DropDownLookingFor"
import DropDownInstruments from "../Forms/DropDownInstruments"
import {buildFormData} from "../../utils"
import UploadWidget from "../../uploadWidget";

class FormEdit extends Component {
    static contextType = UserContext;

    state = {
        firstName: "",
        lastName: "",
        age: 0,
        profilePicture: "",
        description: "",
        lookingFor: [],
        instrumentsPlayed:[],
    };

   componentDidMount(){
       apiHandler.getOneUser(this.props.match.params.id).then((apiRes) =>{
           this.setState({
               firstName: apiRes.data.firstName,
               lastName : apiRes.data.lastName,
               age: apiRes.data.age,
               profilePicture: apiRes.data.profilePicture,
               description: apiRes.data.description,
               lookingFor: apiRes.data.lookingFor,
               instrumentsPlayed: apiRes.data.instrumentsPlayed
           })

       }).catch((error) => console.log(error))
   }

    getValueFromDropDown = (data) => {
        this.setState({lookingFor: data.value});
      }
    
    getValueFromDropDownInstruments = (data) => {
        this.setState({instrumentsPlayed: data.value});
      }

    handleChange = (event) => {
    const value =
        event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
    }

    updateUser(){
        const fd = new FormData();
        buildFormData(fd, this.state);

        apiHandler.updateUser("/users/" + this.state.data.id,fd).then((data) => {
            console.log("dans update user")
            console.log(data)
            console.log(this.props)
            
        })
        .catch((apiError) => {
            console.log(apiError);
        })
    }

    handleFileSelect = ({ tmpUrl, file }) => {
        this.setState({ profilePicture: file });
      };

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateUser();
    }

    render() {
       console.log(this.state)
        return (
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Field>
                <UploadWidget onFileSelect={this.handleFileSelect} name = "profilePicture" id ="profilePicture">
                    Upload Image
                </UploadWidget>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" id="profilePicture" name="profilePicture" />
            </Form.Field>

            <Form.Field>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={this.state.firstName}  />
            </Form.Field>

            <Form.Field>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value = {this.state.lastName} />
            </Form.Field>

            <Form.Field>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" placeholder="Vous devez avoir minimum 18 ans" min="18" max="100" value= {this.state.age} />
            </Form.Field>

            <Form.Field>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" name="description" value= {this.state.description} />
            </Form.Field>

            <DropDownLookingFor value = {this.state.lookingFor} callBack = {this.getValueFromDropDown}/>
            <br/>
            <DropDownInstruments value = {this.state.instrumentsPlayed} callBack = {this.getValueFromDropDownInstruments}/>
            <br/>

            <Button type="submit" value="Submit">Submit</Button>
        </Form>
        )
    }
}

export default withRouter(FormEdit);
