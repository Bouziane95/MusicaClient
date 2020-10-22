import React, { Component } from 'react'
import DropDownSearching from ".././components/Forms/DropDownSearching"

export default class SearchBar extends Component {

    handleCheck = (e) =>{
        this.props.handleCheckBox(e.value)
    }
    
    render() {
        return (
            <div>
            <DropDownSearching callBack={this.handleCheck} placeholder="What instruments do you play ?"/>
            </div>
        )
    }
}
