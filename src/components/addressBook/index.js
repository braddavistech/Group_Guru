import React, { Component } from 'react';
import { Redirect } from "react-router";
import apiData from "../../modules/APIcalls";
import testing from "../../modules/dataFunctions";
import $ from 'jquery';
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "./AddressBook.css";

export default class AddressBook extends Component {
  state = {
    loginMain: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    streetAdd: "",
    city: "",
    stateId: "",
    zip: "",
    phone: "",
    preferredContact: ""
  }

  clearBlur = () => {
    $(".navbar").removeClass("isBlurred");
    $("#addressBookContainer").removeClass("isBlurred");
  }

  addBlur = () => {
    $(".navbar").addClass("isBlurred");
    $("#addressBookContainer").addClass("isBlurred");
  }

  clearState = () => {
    this.setState({ firstName: "", lastName: "", email: "", username: "", streetAdd: "", city: "", stateId: "", zip: "", phone: "", preferredContact: ""})
  }

  saveEdits = () => {
    let newData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      streetAdd: this.state.streetAdd,
      city: this.state.city,
      stateId: this.state.stateId,
      zip: this.state.zip,
      phone: this.state.phone,
      preferredContact: this.state.preferredContact
    }
    if (newData.firstName === "") {newData.firstName = this.props.user.main.currentUser.firstName}
    if (newData.lastName === "") {newData.lastName = this.props.user.main.currentUser.lastName}
    if (newData.email === "" || !testing.emailAndUsernameValidation(newData.email)) {newData.email = this.props.user.main.currentUser.email}
    if (newData.username === "" || testing.emailAndUsernameValidation(newData.username) || newData.username.length < 6 || newData.username.length > 15) {newData.username = this.props.user.main.currentUser.username}
    if (newData.streetAdd === "") {newData.streetAdd = this.props.user.main.currentUser.streetAdd}
    if (newData.city === "") {newData.city = this.props.user.main.currentUser.city}
    if (newData.stateId === "") {newData.stateId = this.props.user.main.currentUser.stateId}
    if (newData.zip === "") {newData.zip = this.props.user.main.currentUser.zip}
    if (newData.phone === "") {newData.phone = this.props.user.main.currentUser.phone}
    if (newData.preferredContact === "") {newData.preferredContact = this.props.user.main.currentUser.preferredContact}
    apiData.getSingleType("users", `email=${newData.email}`).then(exists => {
      if (exists.length === 1) {
        newData.email = this.props.user.main.currentUser.email;
      }
    })
    .then(apiData.getSingleType("users", `username=${newData.username}`).then(exists => {
      if (exists.length === 1) {
        newData.username = this.props.user.main.currentUser.username;
      }
      apiData.updateItem("users", this.props.user.main.currentUser.id, newData)
      .then(() => this.props.user.refresh())
    }))
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      preferredContact: changeEvent.target.value
    });
  }

  handleChange = (event) => {
    let stateToChange = {}
    stateToChange[event.target.name] = event.target.value;
    this.setState(stateToChange)
  }

  backToMain = () => {
    this.setState({ loginMain: true })
  }

  editMyInfo = (user) => {
    this.setState(user , () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          this.addBlur();
          return (
            <div className="editUserAlert">
              <h1 id="messageEditTitle">Edit Your Info</h1>
                <section className="editUserInputSection">
                  <label htmlFor="firstName" className="editUserLabel">First Name<p id="firstNameMissingAlert" className="alert hide">You must enter a first name.</p></label>
                  <input name="firstName" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.firstName}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="lastName" className="editUserLabel">Last Name<p id="lastNameMissingAlert" className="alert hide">You must enter a last name.</p></label>
                  <input name="lastName" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.lastName}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="email" className="editUserLabel">Primary Email<p id="emailMissingAlert" className="alert hide">You must enter your email address.</p><p id="emailValidAlert" className="alert hide">You must enter a valid email address. Please try again.</p><p id="emailDupAlert" className="alert hide">This email address is already registered. Please try again.</p></label>
                  <input name="email" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.email}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="username" className="editUserLabel">Username<p id="usernameMissingAlert" className="alert hide">You must enter a username.</p><p id="usernameLengthAlert" className="alert hide">Your username must be between 6 and 15 characters. Please try again.</p><p id="usernameValidAlert" className="alert hide">The username you entered is not valid in a valid format. Please try again.</p><p id="usernameDupAlert" className="alert hide">This username is already registered. Please try again.</p></label>
                  <input name="username" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.username}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="streetAdd" className="editUserLabel">Address</label>
                  <input name="streetAdd" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.streetAdd}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="city" className="editUserLabel">City</label>
                  <input name="city" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.city}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="stateId" className="editUserLabel">State</label>
                  <input name="stateId" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.stateId}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="zip" className="editUserLabel">Zip</label>
                  <input name="zip" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.zip}></input>
                </section>
                <section className="editUserInputSection">
                  <label htmlFor="phone" className="editUserLabel">Phone</label>
                  <input name="phone" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.phone}></input>
                </section>
                <p id="alertPreference">Select Perferred Communication</p>
                <section id="newUserGroupRadioSection">
                  <label htmlFor="groupStatus" className="newUserRadioLabel">Email
              <input type="radio" name="preferredContact" className="newUserRadioBtn" defaultChecked={this.state.preferredContact === "Email"} onChange={this.handleOptionChange} value="Email" /></label>
                  <label htmlFor="preferredContact" className="newUserRadioLabel">Text
              <input type="radio" name="preferredContact" className="newUserRadioBtn" defaultChecked={this.state.preferredContact === "Text"} onChange={this.handleOptionChange} value="Text" /></label>
                  <label htmlFor="groupStatus" className="newUserRadioLabel">None
              <input type="radio" name="preferredContact" className="newUserRadioBtn" defaultChecked={this.state.preferredContact === "None"} onChange={this.handleOptionChange} value="None" /></label>
                </section>
              <div id="editInfoBtnSection">
                <button className="editInfoBtn" onClick={() => {
                  this.clearBlur();
                  this.clearState();
                  sessionStorage.removeItem("userInfo")
                  onClose()
                }}>Go Back</button>
                <button className="editInfoBtn" onClick={() => {
                  this.clearBlur();
                  this.saveEdits();
                  onClose()
                }}>Save Changes</button>
              </div>
            </div>
          )
        }
      })
    })
  }


  editOtherUser = (member) => {
    console.log("edit other user function: ", member)
  }

  printMembers = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUserId"))
    return this.props.user.main.groupMembers.map(member => {
      if (currentUser !== member.id) {
        return (
          <div className="userAddressCard" key={member.id}>
            <section className="addressBookSection">
              <p className="addressFullLine">{member.firstName} {member.lastName} - {member.username}</p>
              <p className="memberLastOnline">Last online @ {moment(member.lastLogin).fromNow()}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Preferred Contact Method</p>
              <p className="addressFullLine">{member.preferredContact}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Phone</p>
              <p className="addressFullLine">{member.phone}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel"></p>
              <a href={`mailto:${member.email}`} className="addressEmailLink">Email {member.email}</a>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Address</p>
              <p className="addressFullLine">{member.streetAdd}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel"></p>
              <p className="addressFullLine">{member.city}, {member.stateId} {member.zip}</p>
            </section>
            <p className="addressJoinedGroupGuru">Joined Group Guru {moment(member.accountCreationDate).fromNow()}</p>
            <section className="addressBookSectionBtns">
              <button className="addressIndivMemberBtn" value={member} onClick={() => this.editOtherUser(member)}>Edit Info</button>
            </section>
          </div>
        )
      } else {
        return (
          <div className="userAddressCard" key={member.id}>
            <section className="addressBookSection">
              <p className="addressFullLine">{member.firstName} {member.lastName} - {member.username}</p>
              <p className="memberLastOnline">Your Information Card</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Preferred Contact Method</p>
              <p className="addressFullLine">{member.preferredContact}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Phone</p>
              <p className="addressFullLine">{member.phone}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel"></p>
              <a href={`mailto:${member.email}`} className="addressEmailLink">Email {member.email}</a>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Address</p>
              <p className="addressFullLine">{member.streetAdd}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel"></p>
              <p className="addressFullLine">{member.city}, {member.stateId} {member.zip}</p>
            </section>
            <p className="addressJoinedGroupGuru">You Joined Group Guru {moment(member.accountCreationDate).fromNow()}</p>
            <section className="addressBookSectionBtns">
              <button className="addressIndivMemberBtn" value={member} onClick={() => this.editMyInfo(member)}>Edit My Info</button>
            </section>
          </div>
        )
      }
    })
  }


  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".navbar").removeClass("isBlurred");
        $("#addressBookContainer").removeClass("isBlurred");
      }
    });
    let printMembers = this.printMembers();
    if (this.state.loginMain) {
      return <Redirect to="/" />;
    } else {
      return (
        <div id="addressBookContainer">
          <p id="mainAddressBookTitle">Address Book</p>
          <div id="allUserCards">
            {printMembers}
          </div>
          <section className="addressBookMainBtnsSection">
            <button onClick={this.backToMain} className="addressBookMainButton">Back</button>
            <button onClick={() => this.editMyInfo(this.props.user.main.currentUser)} className="addressBookMainButton">Edit My Info</button>
          </section>
        </div>
      )
    }
  }
}

