import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import {UserContext} from "../Auth/UserContext"
import apiHandler from "../../api/apiHandler"
import {Button, Form} from "semantic-ui-react"
import DropDownLookingFor from "../Forms/DropDownLookingFor"
import DropDownInstruments from "../Forms/DropDownInstruments"
import {buildFormData} from "../../Utils"
import UploadWidget from "../../uploadWidget";
import AutoComplete from "../../pages/AutoComplete"
import "../../styles/formEdit.css"

class FormEdit extends Component {
    static contextType = UserContext;

    state = {
        firstName: "",
        lastName: "",
        profilePicture: "",
        description: "",
        lookingFor: [],
        instrumentsPlayed:[],
        age:"",
        location: [],
        link:null,
        sex:"",
        locationAddres:"",
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
               instrumentsPlayed: apiRes.data.instrumentsPlayed,
               link: apiRes.data.link,
               sex: apiRes.data.sex,
               location: apiRes.data.location,
               locationAddres: apiRes.data.locationAddress
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
        console.log(fd)
        console.log(this.state)

        apiHandler.updateUser("/users/" + this.props.match.params.id, fd)
        .then((apiRes) => {
            this.props.history.push("/profile")
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

    handlePlace = (place) => {
        const locationCoordinates = place.geometry.coordinates;
        const locationAddres = place.place_name;
        this.setState({ location: locationCoordinates, locationAddress: locationAddres });
      };

    render() {

        if(!this.context.user) return <div>Loading</div>
        
        return ( 
        <div className= "editDiv">
        <Form className="editForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Field>
                <UploadWidget onFileSelect={this.handleFileSelect} name = "profilePicture" id ="profilePicture">
                    Upload Image
                </UploadWidget>
            </Form.Field>

            <Form.Field>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" defaultValue={this.context.user.firstName}  />
            </Form.Field>

            <Form.Field>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value = {this.state.lastName} />
            </Form.Field>

            <Form.Field>
              <label htmlFor="sexe">Gender</label>
              <select name="sex" id="sex" value= {this.state.sex}>
                <option name="sex" id="sex" value="W">Whatever</option>
                <option name="sex" id="sex" value="M">Male</option>
                <option name="sex" id="sex" value="F">Female</option>
              </select>
            </Form.Field>

            <Form.Field>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" placeholder="Vous devez avoir minimum 18 ans" min="18" max="100" value= {this.state.age} />
            </Form.Field>

            <Form.Field>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" name="description" value= {this.state.description} />
            </Form.Field>

            <Form.Field>
                <label htmlFor="location">In which city you live now ?</label>
                <AutoComplete name="location" id ="location" onSelect= {this.handlePlace}  />
            </Form.Field>

            <DropDownLookingFor  value = {this.state.lookingFor} callBack = {this.getValueFromDropDown}/>
            <br/>
            <DropDownInstruments value = {this.state.instrumentsPlayed} callBack = {this.getValueFromDropDownInstruments}/>
            <br/>

            <Form.Field>
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" placeholder="https://example.com" value= {this.state.link} />
            </Form.Field>

            <Button color="yellow" type="submit" value="Submit">Submit</Button>
        </Form>
        </div>
        )
    }
}

export default withRouter(FormEdit);
