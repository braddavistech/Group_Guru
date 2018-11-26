import React, { Component } from 'react';
// import apiData from "../../modules/APIcalls";
import "./MainPage.css";
import CreateNewGroup from "../createObjects/group";
import CreateMessage from "../createObjects/createMessage";
import OldMessages from "./oldMessages";
import JoinGroup from "../joinGroup";



export default class MainPage extends Component {
  state = {

  }

  componentDidMount = () => {
    this.props.refresh();
  }

  render() {
    if (this.props.user.sendToGroup) {
      return <CreateNewGroup mainPage={this.props.stayAtMain} refresh={this.props.refresh}/>;
    } else if (this.props.user.joinGroup) {
      return <JoinGroup mainPage={this.props.stayAtMain} refresh={this.props.refresh}/>;
    } else if (this.props.user.profileLoaded) {
      if (!this.props.user.inGroup && !this.props.user.closeGroup) {
        return (
          <React.Fragment>
            <div className="topLeft">
              <p id="messageWindow">MESSAGES</p>
              <OldMessages messages={this.props.user.groupMessages} />
              <CreateMessage user={this.props.user} refresh={this.props.refresh}/>
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES</p>
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1 className="mainTitle">Welcome {this.props.user.firstName}!</h1>
                <div id="groupOptions">
                  <section>
                    <h2 className="subTitle">You are not in any groups currently.</h2>
                    <h3 className="subTitle">Would you like to create or join a group?</h3>
                  </section>
                  <article id="alertNavButtonContainer">
                    <button value="noGroup" onClick={this.props.closeGroupMessage} className="alertNavButton">Not Now</button>
                    <button value="joinGroup" onClick={this.props.joinGroup} className="alertNavButton">Join</button>
                    <button value="createGroup" onClick={this.props.createJoinGroup} className="alertNavButton">Create</button>
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
              <OldMessages messages={this.props.user.groupMessages} />
              <CreateMessage user={this.props.user} refresh={this.props.refresh} />
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES</p>
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