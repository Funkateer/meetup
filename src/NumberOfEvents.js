import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="NumberOfEvents_input-label">Number of events:</label>
        <br/>
        <span>Show </span>
        <input
          type="number"
          className="NumberOfEvents_input"
          onChange={this.onNumberChanged}
          value={this.state.number}
        />
        <span> Events</span>
      </div>
    );//return
  }//render
}

export default NumberOfEvents;
