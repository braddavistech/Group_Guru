import React, { Component } from 'react';
import "./NewMessageModular.css";
// import $ from "jquery";

export default class NewMessageModular extends Component {
  state = {
    messageBody: "",
    messageTitle: ""
  }

  componentDidMount () {
    this.setState(this.props.state)
  }

  handleChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
    this.props.handleChange(stateToChange);
  }

  alert = () => {
    return (
      <React.Fragment>
        <section className="messageInputContainer">
          <label className="newMessageLabel" htmlFor="newMessageTitle">Title</label>
          <input className="newMessageInput" type="text" required={true} defaultValue={this.state.messageTitle} onChange={this.handleChange} id="messageTitle" name="messageTitle" placeholder="Enter Message Title"></input>
        </section>
        <section className="messageInputContainer">
          <label className="newMessageLabel" htmlFor="newMessageBody">Message</label>
          <input className="newMessageInput" type="text" name="newMessageBody" defaultValue={this.state.messageBody} onChange={this.handleChange} id="messageBody" placeholder="Enter Your Message Here"></input>
        </section>
      </React.Fragment>
    )
  }

  // alertWithPreview = () => {
  //   return (
  //     <React.Fragment>
  //       <img id="newPhotoPreview" src={this.state.webAddress} alt="Preview of File" />
  //       <section className="imageInputContainer">
  //         <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
  //         <input className="newImageInput" type="text" required={true} defaultValue={this.state.title} onChange={this.handleChange} id="title" name="imageTitle" placeholder="Enter Message Title"></input>
  //       </section>
  //       <section className="imageInputContainer">
  //         <label className="newImageLabel" htmlFor="newImageBody">Image URL</label>
  //         <input className="newImageInput" type="text" name="newImageBody" defaultValue={this.state.webAddress} onChange={this.handleChange} id="webAddress" placeholder="Enter The Address Of The Image"></input>
  //       </section>
  //       <section className="imageInputContainer">
  //         <label className="newImageLabel" htmlFor="newImageDescription">Description</label>
  //         <input className="newImageInput" type="text" name="newImageDescription" defaultValue={this.state.description} onChange={this.handleChange} id="description" placeholder="Enter A Description Of The Image"></input>
  //       </section>
  //     </React.Fragment>
  //   )
  // }

  render() {
    console.log("NewMessageModular: ", this.props)
    return (
      <React.Fragment>
        {this.alert()}
      </React.Fragment>
    )
  }
}