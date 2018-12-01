import React, { Component } from "react";
import BigCalendar from "react-big-calendar"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

export default class Calendar extends Component {
  state= {
    localizer: BigCalendar.momentLocalizer(moment)
  }

  eventDetails = (event) => {
    if (event.slots === undefined) {
      console.log("working event details", event)
    } else {
    console.log("not an event, just a slot", event.slots)
    }
  }

  render () {
    return (
      <React.Fragment>
        <BigCalendar id="smallCalendar" selectable onSelectSlot={(slot) => this.eventDetails(slot)} onSelectEvent={(event) => this.eventDetails(event)} localizer={this.state.localizer} defaultView="month" events={this.props.events} startAccessor="start" endAccessor="end" />
      </React.Fragment>
   )
  }
}