import React, { Component } from 'react';
// let moment = require('moment');
import "./OldPhotos.css";


export default class OldPhotos extends Component {

  printPhotos() {
    let moment = require('moment');
    if (this.props.photos.length > 1) {
      this.props.photos.sort(function (a, b) {
        return new Date(b.addedDate) - new Date(a.addedDate);
      });
    }
    return (this.props.photos.map(photo => (
      <section className="indivPhotos" key={photo.id}>
        <p className="oldPhotosTitle">{photo.user.username} - {moment(`${photo.addedDate}`).fromNow()}</p>
        <img className="oldPhotosImage" src={photo.webAddress} alt={photo.title}></img>
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