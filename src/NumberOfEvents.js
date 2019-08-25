import React, { Component } from 'react';

import { ErrorAlert, WarningAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
    errorText:'',
    warningText:''
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.setState({warnigText: ""})
    if(value < 1)
    {
      this.setState({ errorText: " Number of events should be at least 1" })
    }
    else
    {
      this.props.updateEvents(null, null, value);
      this.setState({ errorText: "" })
    }
    if (!navigator.onLine)
    {
    this.setState({ warningText: "You are offline, all the events are loaded from previous session" });
    }
    else
    {
      this.setState({ warningText: "" })
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
        <div className="alerts">
        <WarningAlert text ={this.state.warningText}/>
        <ErrorAlert text={this.state.errorText} />
        </div>
      </div>
    );//return
  }//render
}

export default NumberOfEvents;
