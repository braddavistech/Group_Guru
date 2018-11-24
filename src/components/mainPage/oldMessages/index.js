import React, { Component } from 'react';
import "./OldMessages.css";


export default class OldMessages extends Component {
  // state = {
  //   oldMessages: []
  // }


  printMessages () {
      return ( this.props.messages.map(message => (
      <section className="indivMessage" key={message.id}>
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