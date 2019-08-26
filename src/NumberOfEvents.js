import React, { Component } from 'react';

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
    warningText:''
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.setState({warnigText: ""})
    if(value < 1)
    {
      this.setState({ errorText: " Number of events must be at least 1" })
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
        <input type="number" className="NumberOfEvents_input" onChange={this.onNumberChanged} value={this.state.number}/>
        <div className="alerts">
          <ErrorAlert className="alerts_text"text={this.state.errorText} />
        </div>
      </div>
    );//return
  }//render
}

export default NumberOfEvents;
