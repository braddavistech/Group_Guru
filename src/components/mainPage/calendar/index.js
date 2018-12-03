import React, { Component } from "react";
import BigCalendar from "react-big-calendar"
import moment from "moment";
// import EventDetails from "../../modulars/eventDetails";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { confirmAlert } from "react-confirm-alert";
import $ from "jquery";

export default class Calendar extends Component {
  state = {
    localizer: BigCalendar.momentLocalizer(moment),
    message: null,
    messageLoaded: false
  }

  addBlur = () => {
    $(".navbar").addClass("isBlurred");
    $(".topLeft").addClass("isBlurred");
    $(".topRight").addClass("isBlurred");
    $(".middleRow").addClass("isBlurred");
    $(".alertBottom").addClass("isBlurred");
  }

  removeBlur = () => {
    $(".navbar").removeClass("isBlurred");
    $(".topLeft").removeClass("isBlurred");
    $(".topRight").removeClass("isBlurred");
    $(".middleRow").removeClass("isBlurred");
    $(".alertBottom").removeClass("isBlurred");
  }

  messageNull = () => {
    this.setState({ message: null })
  }

  // eventDetails = (event) => {
  //   if (event === undefined) {
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         this.addBlur();
  //         return (
  //           <React.Fragment>

  //             {/* <EventDetails event={this.state.message} /> */}
  //             <section id="newButtonContainer">
  //               <button className="newCreateBtn" onClick={() => {
  //                 this.removeBlur();
  //                 this.messageNull();
  //                 onClose();
  //               }}>Back</button>
  //             </section>
  //           </React.Fragment>
  //         )
  //       }
  //     })
  //     console.log(event)
  //     this.setState({ message: event })
  //   } else {
  //     console.log("not an event, just a slot", event.slots)
  //   }
  // }

  showDetails = () => {
    return (
      confirmAlert({
        customUI: ({ onClose }) => {
          this.addBlur();
          return (
            <div className="eventDetailsAlert">
            <p className="eventTitleDetails">{this.state.message.title}</p>
            <p className="eventTitleDetails">{this.state.message.description}</p>
            <p className="eventTitleDetails">Begins {moment(this.state.message.start, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")
               }</p>
            <p className="eventTitleDetails">Ends {moment(this.state.message.end, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")}</p>
            <p className="eventTitleDetails">Details/Notes</p>
            <p className="eventTitleDetails">{this.state.message.notes}</p>
            <p className="eventTitleDetails">Location</p>
            <p className="eventTitleDetails">{this.state.message.location}</p>
            <p className="eventTitleDetails">Address</p>
            <p className="eventTitleDetails">{this.state.message.streetAdd}</p>
            <p className="eventTitleDetails">{this.state.message.city}, {this.state.message.state} {this.state.message.zip}</p>
              <section id="newButtonContainer">
                <button className="newCreateBtn" onClick={() => {
                  this.removeBlur();
                  this.messageNull();
                  onClose();
                }}>Back</button>
              </section>
            </div>
          )
        }
      })
    )
  }

  // setNewMessage = (data) => {
  //   this.setState({ message: data }, () => {
  //     this.setState({ messageLoaded: true })
  //   })
  // }

  // grabTarget = (event) => {
  //   console.log("event", event)
  //   this.setNewMessage(event);
  // }

  eventDetails = (event) => {
    console.log("slot", event)
  }

  render() {
    if (this.state.message !== null) {
      this.showDetails()
      return (
        <React.Fragment>
          <BigCalendar id="smallCalendar" selectable onSelectSlot={(slot) => this.eventDetails(slot)} onSelectEvent={(event) => { this.setState({ message: event }) }} localizer={this.state.localizer} defaultView="agenda" events={this.props.events} startAccessor="start" endAccessor="end" />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <BigCalendar id="smallCalendar" selectable onSelectSlot={(slot) => this.eventDetails(slot)} onSelectEvent={(event) => { this.setState({ message: event }) }} localizer={this.state.localizer} defaultView="agenda" events={this.props.events} startAccessor="start" endAccessor="end" />
        </React.Fragment>
      )
    }
  }
}