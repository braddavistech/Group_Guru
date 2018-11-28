import React, { Component } from 'react';
import apiData from "../../../modules/APIcalls";
import "./OldMessages.css";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";


export default class OldMessages extends Component {
  state = {
    titleInputValue: "",
    bodyInputValue: "",
    oldMessage: {}
  }

  editMessage = (event) => {
    let targetMessage = parseInt(event.target.value);
    let oldMess = this.props.messages.find(e => e.id === targetMessage);
    this.setState({ oldMessage: oldMess }, () => {
      this.setState({ titleInputValue: this.state.oldMessage.messageTitle, bodyInputValue: this.state.oldMessage.messageBody })
    })
    $(`.${targetMessage}titleInput`).show();
    $(`.${targetMessage}bodyInput`).show();
    this.setState({ originalTitle: $(`.${targetMessage}titleInput`).value });
    this.setState({ originalBody: $(`.${targetMessage}bodyInput`).value })
    $(`.${targetMessage}text`).hide();
    $(`.${targetMessage}body`).hide();
    $(`#${targetMessage}saveBtn`).show();
    $(".editBtn").hide();
    $(".deleteBtn").hide();
    $(`#${targetMessage}deleteBtn`).show();
  }

  titleInputValue = (event) => {
    this.setState({
      titleInputValue: event.target.value
    });
  }

  bodyInputValue = (event) => {
    this.setState({
      bodyInputValue: event.target.value
    });
  }

  saveMessage = (event) => {
    let targetMessage = event.target.value;
    let editMessage = {
      messageBody: this.state.bodyInputValue
    }
    let alreadyEdited = this.state.titleInputValue.includes("(edited)");
    if (alreadyEdited) {
      editMessage.messageTitle = this.state.titleInputValue;
    } else {
      editMessage.messageTitle = this.state.titleInputValue + "(edited)";
    }
    if (editMessage.messageTitle === "(edited)") {
      editMessage.messageTitle = this.state.oldMessage.messageTitle;
    }
    if (editMessage.messageBody === "") {
      editMessage.messageBody = this.state.oldMessage.messageBody;
    }
    this.setState({
      titleInputValue: "",
      bodyInputValue: "",
      oldMessage: {}
    })
    $(`.${targetMessage}titleInput`).hide();
    $(`.${targetMessage}bodyInput`).hide();
    $(`.${targetMessage}text`).show();
    $(`.${targetMessage}body`).show();
    $(`#${targetMessage}saveBtn`).hide();
    $(".editBtn").show();
    $(".deleteBtn").show();
    apiData.updateItem("messages", event.target.value, editMessage)
      .then(() => this.props.refresh())
  }

  deleteMessage = (messageId) => {
    apiData.deleteItem("messages", messageId)
      .then(() => this.props.refresh())
  }

  deleteConfirmation = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        $(".navbar").addClass("isBlurred");
        $(".topLeft").addClass("isBlurred");
        $(".topRight").addClass("isBlurred");
        $(".middleRow").addClass("isBlurred");
        $(".alertBottom").addClass("isBlurred");
        const messageTarget = event.target.value;
        return (
          <div className="deleteAlert">
            <img src="../../../groupGuruLogo.jpg" id="logoForLoginAlert" alt="Group Guru Logo" />
            <div id="deleteTextDiv">
              <h1 id="areYouSure">Are you sure?</h1>
              <p id="deleteFile">This will permanently delete this message.</p>
            </div>
            <div id="deleteBtnSection">
            <button className="deleteConfirmation" onClick={() => {
              $(".navbar").removeClass("isBlurred");
              $(".topLeft").removeClass("isBlurred");
              $(".topRight").removeClass("isBlurred");
              $(".middleRow").removeClass("isBlurred");
              $(".alertBottom").removeClass("isBlurred");
              onClose()}}>No, Keep Message</button>
            <button className="deleteConfirmation" onClick={() => {
              this.deleteMessage(messageTarget)
              $(".navbar").removeClass("isBlurred");
               $(".topLeft").removeClass("isBlurred");
               $(".topRight").removeClass("isBlurred");
               $(".middleRow").removeClass("isBlurred");
               $(".alertBottom").removeClass("isBlurred");
              onClose()
            }}>Yes, Delete It</button>
            </div>
          </div>
        )
      }
    })
  }

  printMessages() {
    let moment = require('moment');
    if (this.props.messages.length > 1) {
      this.props.messages.sort(function (a, b) {
        return new Date(b.messageDate) - new Date(a.messageDate);
      });
    }
    return (this.props.messages.map(message => {
      if (message.user.username === this.props.user.username) {
        return <section className="indivMessageOwner" key={message.id}>
          <div className="oldMsgTitleOwner">
            <p id="userInfo">{moment(`${message.messageDate}`).fromNow()} </p>
            <article id="editDelete">
              <button value={message.id} className="saveBtn hide" id={`${message.id}saveBtn`} onClick={this.saveMessage}>Save</button>
              <button value={message.id} className="editBtn" onClick={this.editMessage} >Edit</button>
              <button value={message.id} className="deleteBtn" id={`${message.id}deleteBtn`} onClick={this.deleteConfirmation}>Delete</button>
            </article>
          </div>
          <input className={`messageTitleInput hide ${message.id}titleInput`} onChange={this.titleInputValue} defaultValue={message.messageTitle}></input>
          <p className={`oldMsgTitle ${message.id}text`}>{message.messageTitle}</p>
          <input className={`messageBodyInput hide ${message.id}bodyInput`} onChange={this.bodyInputValue} defaultValue={message.messageBody}></input>
          <p className={`oldMsgBody ${message.id}body`}>{message.messageBody}</p>
        </section>
      } else {
        return <section className="indivMessageOther" key={message.id}>
          <p className="oldMsgTitle">{message.user.username} - {moment(`${message.messageDate}`).fromNow()}</p>
          <p className="oldMsgTitle">{message.messageTitle}</p>
          <p className="oldMsgBody">{message.messageBody}</p>
        </section>
      }
    }
    ))
  }


  render() {
    return (
      <div id="oldMessages">
        {this.printMessages()}
        <p id="endOfMessages" dangerouslySetInnerHTML={{ __html: '&bigstar;  End Of Messages  &bigstar;' }}></p>
      </div>
    )
  }

}