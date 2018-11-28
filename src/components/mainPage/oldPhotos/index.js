import React, { Component } from 'react';
import "./OldPhotos.css";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import $ from "jquery"


export default class OldPhotos extends Component {

  photoDetails = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        $(".navbar").addClass("isBlurred");
        $(".topLeft").addClass("isBlurred");
        $(".topRight").addClass("isBlurred");
        $(".middleRow").addClass("isBlurred");
        $(".alertBottom").addClass("isBlurred");
        const photoTarget = parseInt(event.target.id);
        let oldPhoto = this.props.photos.find(e => e.id === photoTarget);
        return (
          <div className="photoDetails">
            <div id="photoTitleTextDiv">
              <p id="photoDetailsHeader">{oldPhoto.title}</p>
              <img id="photoDetailsImage" src={oldPhoto.webAddress} alt={oldPhoto.title}></img>
              <p className="photoTextDescription">{oldPhoto.description}</p>
              <p className="photoTextDetails">Added by {oldPhoto.user.username} on {moment(`${oldPhoto.addedDate}`).fromNow()}</p>
              <p className="photoTextDetails">Email Address: {oldPhoto.user.email}</p>
            </div>
            <div id="photoBtnSection">
            <button className="photoConfirmation" onClick={() => {
               $(".navbar").removeClass("isBlurred");
               $(".topLeft").removeClass("isBlurred");
               $(".topRight").removeClass("isBlurred");
               $(".middleRow").removeClass("isBlurred");
               $(".alertBottom").removeClass("isBlurred");
              onClose()}}>Back</button>
            <button className="photoConfirmation" onClick={() => {
              $(".navbar").removeClass("isBlurred");
              $(".topLeft").removeClass("isBlurred");
              $(".topRight").removeClass("isBlurred");
              $(".middleRow").removeClass("isBlurred");
              $(".alertBottom").removeClass("isBlurred");
              onClose()
            }}><a id="mailToPhoto" href={'mailto:' + oldPhoto.user.email} target="_top">Send Email to {oldPhoto.user.username}</a></button>
            </div>
          </div>
        )
      }
    })
  }

  printPhotos() {
    if (this.props.photos.length > 1) {
      this.props.photos.sort(function (a, b) {
        return new Date(b.addedDate) - new Date(a.addedDate);
      });
    }
    return (this.props.photos.map(photo => (
      <section className="indivPhotos" key={photo.id}>
        <p className="oldPhotosTitle">{photo.user.username} - {moment(`${photo.addedDate}`).fromNow()}</p>
        <article className="photoSectionWithZoom">
        <img className="oldPhotosImage" src={photo.webAddress} alt={photo.title}></img>
        <img className="zoomBtn" value={photo.id} id={photo.id} onClick={this.photoDetails} src="../../zoomIcon.png" alt="Zoom In"></img>
        </article>
      </section>))
    )
  }

  render() {
    return (
      <div id="oldPhotos">
        {this.printPhotos()}
      </div>
    )
  }

}