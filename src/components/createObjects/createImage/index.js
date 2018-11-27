import React, { Component } from 'react';
// import React from 'react':
// import ApplicationViews from "../../ApplicationViews"
import apiData from "../../../modules/APIcalls";
import $ from "jquery";
import "./CreateImage.css";

export default class CreateImage extends Component {

  gatherInputValues = () => {
    $(".alert").hide()
    let imageValidation = true;
    let image = {
      addedDate: new Date(),
      title: this.title.value,
      webAddress: this.imageBody.value,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (image.title === "") {
      $("#imageTitleAlert").show();
      imageValidation = false;
    }
    if (image.webAddress === "") {
      $("#imageBodyAlert").show();
      imageValidation = false;
    }
    if (imageValidation) {
      apiData.newDataPost(image, "photos").then(() =>
      this.props.refresh())
      this.title.value = "";
      this.imageBody.value = "";
    }
  }

  render() {

    return (
      <React.Fragment>
        <div id="newImage">
          <article className="alertSection"><p id="imageTitleAlert" className="alert hide">You must enter an image title.</p></article>
          <section className="imageInputContainer">
            <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
            <input type="text" required={true} id="newTitle" name="imageTitle" ref={(userInput) => this.title =
              userInput} placeholder="Enter Message Title"></input>
          </section>
          <article className="alertSection"><p id="imageBodyAlert" className="alert hide">You must enter a message to create it.</p></article>
          <section className="imageBodyInputContainer">
            <label className="newImageLabel" htmlFor="newImageBody">Image URL</label>
            <input type="text" name="newImageBody" ref={(userInput) => this.imageBody =
              userInput} id="imageBody" placeholder="Enter The Address Of The Image"></input>
          </section>
          <section id="newImageButtonContainer">
              <button onClick={this.gatherInputValues} id="newImageCreateBtn">Create Message</button>
            </section>
        </div>
      </React.Fragment>
    )
  }

}