import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import {  WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    lat: null,
    lon: null,
    page: null,
    warningText:''
  }

  componentDidMount() {
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    if (!navigator.onLine)
    {
    this.setState({ warningText: "You are currently offline, events are loaded from last session" });
    }
    else
    {
      this.setState({ warningText: "" })
    }
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events =>
        this.setState({ events, lat, lon })
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events =>
        this.setState({ events, page })
      );
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events =>
        this.setState({ events })
      );
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className = "header">Meetup<span className="headerSpan"> ... almost</span></h1>
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <div className="alerts">
          <WarningAlert className="alerts_text" text ={this.state.warningText}/>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
