import React, { Component } from 'react'

export default class SearchBar extends Component {

    state={
        search: [],
    }

    handleCheck = (e) =>{
        let value = e.target.value
        
        if(e.target.checked){
            this.setState({
                search: [...this.state.search,value],
            }, () =>  this.props.handleCheckBox(this.state.search))
        } else if(!e.target.checked) {
            this.setState({
                search:this.state.search.filter(v=>v!==value)
            }, () =>  this.props.handleCheckBox(this.state.search))
        }
    }

    render() {
        return (
            <div>
                <input value="Guitarist" type="checkbox" onClick = {this.handleCheck}/>
                <label name="Guitarist" htmlFor="Guitarist">Guitarist</label>
                <input value="Bassist" type="checkbox" onClick = {this.handleCheck}/>
                <label name="Bassist" htmlFor="Bassist">Bassist</label>
            </div>
        )
    }
}
