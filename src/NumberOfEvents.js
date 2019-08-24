import React, { Component } from 'react';

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
    errorText:''
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    if(value < 1)
    {
      this.setState({ errorText: " Number should be at least 1." })
    }
    else
    {
      this.props.updateEvents(null, null, value);
      this.setState({ errorText: "" })
    }
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
        <ErrorAlert text={this.state.errorText} />
      </div>
    );//return
  }//render
}

export default NumberOfEvents;
