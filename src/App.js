import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

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
  countEventsOnADate = (date) => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  }

  getData = () => {
    const next7Days = []; // Create empty array for the next 7 days
    const currentDate = moment(); // Today
    // Loop 7 times for next 7 days
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, 'days'); // Add 1 day to current date, currentDate changes
      const dateString = currentDate.format('YYYY-MM-DD'); // Format the date
      // Use the countEventsOnADate function to count #events on this date
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count }); // Add this date and number to the list
    }
    return next7Days;
  }

  render() {
    return (
      <div className="App">
        <h1 className = "header">Meetup<span className="headerSpan"> ... almost</span></h1>
        <p className="CitySearch-title"> Find Meetup events in the city of your choice</p>
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <div className="alerts">
          <WarningAlert className="alerts_text" text ={this.state.warningText}/>
        </div>
        <div className= "responsiveContainer-scatter">
          <ResponsiveContainer height={240} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray= '3 3' />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ stroke: '3 3' }} />
            <Scatter name="A school" data={this.getData()} fill="#8884d8" />
          </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
