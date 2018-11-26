import React, { Component } from 'react';
// let moment = require('moment');
import "./OldMessages.css";


export default class OldMessages extends Component {

  printMessages() {
    let moment = require('moment');
    if (this.props.messages.length > 1) {
      this.props.messages.sort(function (a, b) {
        return new Date(b.messageDate) - new Date(a.messageDate);
      });
    }
    return (this.props.messages.map(message => (
      <section className="indivMessage" key={message.id}>
        <p className="oldMsgTitle">{message.user.username} - {moment(`${message.messageDate}`).fromNow()}</p>
        <p className="oldMsgTitle">{message.messageTitle}</p>
        <p className="oldMsgBody">{message.messageBody}</p>
      </section>))
    )
  }

  render() {
    return (
      <div id="oldMessages">
        {this.printMessages()}
      </div>
    )
  }

}