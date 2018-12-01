import React, { Component } from 'react';
import "./MainPage.css";
import CreateNewGroup from "../createObjects/group";
// import CreateMessage from "../createObjects/createMessage";
import OldMessages from "./oldMessages";
import JoinGroup from "../joinGroup";
// import NewImage from "./newPhoto";
import OldPhotos from "./oldPhotos";
import NewPhotoModular from "../modulars/newPhoto";
import NewMessageModular from "../modulars/newMessage";
import apiData from "../../modules/APIcalls";
import { confirmAlert } from "react-confirm-alert";
import $ from "jquery";



export default class MainPage extends Component {
  state = {
    webAddress: "",
    description: "",
    title: "",
    messageTitle: "",
    messageBody: ""
  }

  handleChange = (stateToChange) => {
    this.setState(stateToChange)
  }

  gatherMessageValues = () => {
    let message = {
      messageDate: new Date(),
      messageTitle: this.state.messageTitle,
      messageBody: this.state.messageBody,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (this.state.messageTitle !== "" && this.state.messageBody !== "") {
      apiData.newDataPost(message, "messages").then(() => {
        this.setState({ messageTitle: "", messageBody: "", goodToSave: false });
        this.props.user.refresh();
      })
    }
    else { this.messageDetails() }
  }

  messageDetails = () => {
    console.log("inside messageDetails")
    confirmAlert({
      customUI: ({ onClose }) => {
        $(".navbar").addClass("isBlurred");
        $(".topLeft").addClass("isBlurred");
        $(".topRight").addClass("isBlurred");
        $(".middleRow").addClass("isBlurred");
        $(".alertBottom").addClass("isBlurred");
        console.log("test", this.state.description)
        return (
          <div id="newMessage">
            <NewMessageModular props={this.props} handleChange={this.handleChange} state={this.state} />
            <section id="newButtonContainer">
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                onClose();
              }}>Back</button>
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                this.gatherMessageValues()
                onClose();
              }}>Add Message</button>
            </section>
          </div>
        )
      }
    })
  }

  gatherPhotoValues = () => {
    let image = {
      addedDate: new Date(),
      title: this.state.title,
      webAddress: this.state.webAddress,
      description: this.state.description,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (this.state.title !== "" && this.state.webAddress !== "" && this.state.description !== "") {
      apiData.newDataPost(image, "photos").then(() => {
        this.setState({ webAddress: "", description: "", title: "", goodToSave: false });
        this.props.user.refresh();
      })
    }
    else { this.photoDetails() }
  }

  photoDetails = () => {
    console.log("inside photoDetails")
    confirmAlert({
      customUI: ({ onClose }) => {
        $(".navbar").addClass("isBlurred");
        $(".topLeft").addClass("isBlurred");
        $(".topRight").addClass("isBlurred");
        $(".middleRow").addClass("isBlurred");
        $(".alertBottom").addClass("isBlurred");
        console.log("test", this.state.description)
        return (
          <div id="newImage">
            <NewPhotoModular props={this.props} handleChange={this.handleChange} state={this.state} />
            <section id="newButtonContainer">
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                onClose();
              }}>Back</button>
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                this.gatherPhotoValues()
                onClose();
              }}>Add Photo</button>
            </section>
          </div>
        )
      }
    })
  }

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
              <p id="messageWindow">MESSAGES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.messageDetails} className="addIcon" />
              </p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
              {/* <CreateMessage user={this.props.user} refresh={this.props.user.refresh} /> */}
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.photoDetails} className="addIcon" />
              </p>
              <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} />
              {/* <NewImage user={this.props.user} refresh={this.props.user.refresh} /> */}
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
              <p id="messageWindow">MESSAGES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.messageDetails} className="addIcon" />
              </p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
              {/* <CreateMessage user={this.props.user} refresh={this.props.user.refresh} /> */}
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR</p>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.photoDetails} className="addIcon" />
              </p>
              <section id="photoSection">
                <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} />
              </section>
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