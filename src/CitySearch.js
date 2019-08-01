import React, { Component } from 'react';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  }

  handleItemClicked = (value) => {
    this.setState({ query: value });
  }

  render() {
    return (
      <div className="CitySearch">
        <input type="text" className="city" value={this.state.query}
          onChange={this.handleInputChanged} placeholder="Search a city..."
        />
        <ul className="suggestions">
          {this.state.suggestions.map(item =>
            <li key={item.name_string} onClick={() => this.handleItemClicked(item.name_string)}>
              {item.name_string}
            </li>
          )}
        </ul>
      </div>//CitySearch
    );//return
  }//render
}

export default CitySearch;
