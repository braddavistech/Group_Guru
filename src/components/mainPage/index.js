import React, { Component } from 'react';
import "./MainPage.css";
import CreateNewGroup from "../createObjects/group";
import CreateMessage from "../createObjects/createMessage";
import OldMessages from "./oldMessages";
import JoinGroup from "../joinGroup";
import CreateImage from "../createObjects/createImage";
import OldPhotos from "./oldPhotos";



export default class MainPage extends Component {

  render() {
    if (this.props.user.main.sendToGroup) {
      return <CreateNewGroup mainPage={this.props.user.stayAtMain} refresh={this.props.user.refresh} />;
    } else if (this.props.user.main.joinGroup) {
      return <JoinGroup mainPage={this.props.user.stayAtMain} joinGroup={this.props.user.main.joinGroup} refresh={this.props.user.refresh} />;
    } else if (this.props.user.main.profileLoaded) {
      if (!this.props.user.main.inGroup && !this.props.user.main.closeGroup) {
        return (
          <React.Fragment>
            <div className="topLeft">
              <p id="messageWindow">MESSAGES</p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser}/>
              <CreateMessage user={this.props.user} refresh={this.props.user.refresh} />
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES</p>
              <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} />
              <CreateImage user={this.props.user} refresh={this.props.user.refresh} />
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1 className="mainTitle">Welcome {this.props.user.main.currentUser.firstName}!</h1>
                <div id="groupOptions">
                  <section>
                    <h2 className="subTitle">You are not in any groups currently.</h2>
                    <h3 className="subTitle">Would you like to create or join a group?</h3>
                  </section>
                  <article id="alertNavButtonContainer">
                    <button value="noGroup" onClick={this.props.user.closeGroupMessage} className="alertNavButton">Not Now</button>
                    <button value="joinGroup" onClick={this.props.user.joinGroup} className="alertNavButton">Join</button>
                    <button value="createGroup" onClick={this.props.user.createJoinGroup} className="alertNavButton">Create</button>
                  </article>
                </div>
              </article>
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <div className="topLeft">
              <p id="messageWindow">MESSAGES</p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser}/>
              <CreateMessage user={this.props.user} refresh={this.props.user.refresh} />
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES</p>
              <section id="photoSection">
                <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} />
              </section>
              <CreateImage user={this.props.user} refresh={this.props.user.refresh} />
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1>This is where info on events for this group since last login will appear.</h1>
              </article>
            </div>
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          <div className="topLeft">Test Area</div>
          <div className="topRight">Test</div>
          <div className="middleRow">
            <h1 className="mainTitle">Welcome to Group Guru. We are loading your profile.</h1>
          </div>
          <div className="alertBottom">
            {this.noGroupAlert}
          </div>
        </React.Fragment>
      )
    }
  }
}