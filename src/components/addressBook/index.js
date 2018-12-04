import React, { Component } from 'react';
import { Redirect } from "react-router";
// import apiData from "../../../modules/APIcalls";
// import testing from "../../../modules/dataFunctions";
// import $ from 'jquery';
import moment from "moment";
import "./AddressBook.css";

export default class AddressBook extends Component {
  state = {
    loginMain: false,
    securityQuestionId: 0
  }



  backToMain = () => {
    this.setState({ loginMain: true })
  }

  editMyInfo = (user) => {
    console.log("Edit My Info Fuction", user)
  }

  editOtherUser = (member) => {
    console.log("edit other user function: ", member)
  }

  printMembers = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUserId"))
    return this.props.user.main.groupMembers.map(member => {
      if(currentUser !== member.id) {
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
            <button onClick={this.editMyInfo} className="addressBookMainButton">Edit My Info</button>
          </section>
        </div>
      )
    }
  }
}

