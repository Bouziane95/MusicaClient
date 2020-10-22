import React, { Component } from 'react';
import axios from "axios";
import "../styles/AutoComplete.css"


export default class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
          search: "",
          results: [],
          isLoading: false,
          coordinates: [],
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
      }

      handleSearchChange(e) {
        this.setState({
          search: e.target.value,
          isLoading: true,
        });

         // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);

    // Launch a new request in 1000ms (1s) => Avoids excessive requests to the end point.
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  }

  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
        coordinates: [],
      });
      return;
    }

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=pk.eyJ1IjoiYm91Ym91OTUiLCJhIjoiY2tmbWRmdTduMDYxZjM1bWU5ejU3OHU2cyJ9.qVQnw89kJEBWHTsbyV2sBQ`
      )
      .then((response) => {
        this.setState({
          results: response.data.features,
          isLoading: false,
        });
      });
  }

  handleAddressClicked(place) {
    this.setState({
      search: place.place_name,
      results: [],
      coordinates: place.geometry.coordinates,
    });

    this.props.onSelect(place);
  }

    render() {
        const { results, isLoading } = this.state;
        return (
    <div className="AutocompletePlace">
        <input
          className="input"
          type="text"
          value={this.props.defaultValue || this.state.search}
          onChange={this.handleSearchChange}
          placeholder="Type an address"
        />

        <ul className="AutocompletePlace-results">
          {results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => this.handleAddressClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {isLoading && <li className="AutocompletePlace-items">Loading...</li>}
        </ul>

    </div>
        )
    }
}
