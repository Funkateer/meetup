import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

class Event extends Component {
  state = {
    expanded: false,
    events: []
  }

  onDetailsButtonClicked = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const event = this.props.event;
    const data=[],
    colors =[ "#8884d8", "#4dd2ff"];

   data.push({ name: "people going", value: event.yes_rsvp_count }, { name: "slots left", value: (event.rsvp_limit - event.yes_rsvp_count) });

    return (
      <div className="Event">
        <p className="time">{event.local_time} - {event.local_date}</p>
        <p className="name">{event.name}</p>
        {event.group && event.group.name && <p className="group-name">Group: {event.group.name}</p>}
        {this.state.expanded &&
          <div className="extra">
            {event.venue && event.venue.name &&
              <p className="address">
                {event.venue.name
                  + ', ' + event.venue.address_1
                  + ', ' + event.venue.city
                  + ', ' + event.venue.localized_country_name
                }
              </p>
            } <br/>
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}} />
            <br/>
            <p className="visibility">{event.visibility}</p>
            <a className="link" href={event.link}>Event Link</a>
            <p className="going">{
              <ResponsiveContainer height={160} width={290}>
                  <PieChart>
                  <Pie data= {data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={32}  label >
                    {
                      data.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index]}/>))
                    }
                  </Pie>
                <Legend iconSize={12} iconType = "circle" layout="vertical" verticalAlign="middle" align="left" />
                <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            }
            </p>
          </div> //extra
        }
        <button className="details-btn" onClick={this.onDetailsButtonClicked}>Details</button>
      </div>//Event
    );//return
  }//render
}

export default Event;
