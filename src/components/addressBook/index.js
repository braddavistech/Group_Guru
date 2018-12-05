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
    emailSecondary: "",
    username: "",
    streetAdd: "",
    city: "",
    stateId: "",
    zip: "",
    phone: "",
    preferredContact: "",
    id: 0
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
    this.setState({ firstName: "", lastName: "", email: "", emailSecondary: "", username: "", streetAdd: "", city: "", stateId: "", zip: "", phone: "", preferredContact: "" })
  }

  saveOtherEdits = () => {
    let newData = {
      emailSecondary: this.state.emailSecondary,
      streetAdd: this.state.streetAdd,
      city: this.state.city,
      stateId: this.state.stateId,
      zip: this.state.zip,
      phone: this.state.phone,
    }
    let member = this.props.user.main.groupMembers.find(user => user.id === this.state.id)
    if (newData.emailSecondary === "") { newData.emailSecondary = member.emailSecondary }
    let tempCheckEmail = newData.emailSecondary;
    if (tempCheckEmail.includes("(modified")) {
      tempCheckEmail = tempCheckEmail.split(" ");
      console.log("tempCheckEmail", tempCheckEmail[0])
      if (testing.emailAndUsernameValidation(tempCheckEmail[0])) { newData.emailSecondary = tempCheckEmail[0] }
      else { newData.emailSecondary = member.emailSecondary };
    } else if (!testing.emailAndUsernameValidation(newData.emailSecondary)) {
      newData.emailSecondary = member.emailSecondary
    }
    if (newData.emailSecondary !== member.emailSecondary && !newData.emailSecondary.includes("(modified)")) { newData.emailSecondary = `${newData.emailSecondary} (modified)` }
    if (newData.streetAdd === "") { newData.streetAdd = member.streetAdd }
    if (newData.streetAdd !== member.streetAdd && !newData.streetAdd.includes("(modified)")) { newData.streetAdd = `${newData.streetAdd} (modified)` }
    if (newData.city === "") { newData.city = member.city }
    if (newData.city !== member.city && !newData.city.includes("(modified)")) { newData.city = `${newData.city} (modified)` }
    if (newData.stateId === "") { newData.stateId = member.stateId }
    if (newData.stateId !== member.stateId && !newData.stateId.includes("(modified)")) { newData.stateId = `${newData.stateId} (modified)` }
    if (newData.zip === "") { newData.zip = member.zip }
    if (newData.zip !== member.zip && !newData.zip.includes("(modified)")) { newData.zip = `${newData.zip} (modified)` }
    if (newData.phone === "") { newData.phone = member.phone }
    if (newData.phone !== member.phone && !newData.phone.includes("(modified)")) { newData.phone = `${newData.phone} (modified)` }
    apiData.updateItem("users", member.id, newData)
      .then(() => {
        this.props.user.refresh()
        this.clearState();
      })
  }

  editContactInfo = (contact) => {
    console.log("contactInfo function", contact)
  }

  saveNewContact = () => {
    let canSave = true;
    let newData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      emailSecondary: this.state.emailSecondary,
      streetAdd: this.state.streetAdd,
      city: this.state.city,
      stateId: this.state.stateId,
      zip: this.state.zip,
      phone: this.state.phone,
      type: "contact",
      groupId: this.props.user.main.currentUser.groupId
    }
    if (newData.firstName === "") { newData.firstName = "None Provided" }
    if (newData.lastName === "") { newData.lastName = "None Provided" }
    if (newData.email === "") { newData.email = "None Provided" }
    if (newData.emailSecondary === "") { newData.emailSecondary = "None Provided" }
    if (newData.streetAdd === "") { newData.streetAdd = "None Provided" }
    if (newData.city === "") { newData.city = "None Provided" }
    if (newData.stateId === "") { newData.stateId = "None Provided" }
    if (newData.zip === "") { newData.zip = "None Provided" }
    if (newData.phone === "") { newData.phone = "None Provided" }
    if (newData.lastName === "None Provided" && newData.firstName === "None Provided") { canSave = false; }
    if (newData.email === "None Provided" && newData.phone === "None Provided" && newData.streetAdd === "None Provided") { canSave = false }
    if (canSave) {
      apiData.newDataPost(newData, "addedContacts")
        .then(() => {
          this.props.user.refresh()
          this.clearState();
        })
    }
  }

  saveEdits = () => {
    let newData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      emailSecondary: this.state.emailSecondary,
      username: this.state.username,
      streetAdd: this.state.streetAdd,
      city: this.state.city,
      stateId: this.state.stateId,
      zip: this.state.zip,
      phone: this.state.phone,
      preferredContact: this.state.preferredContact
    }
    if (newData.firstName === "") { newData.firstName = this.props.user.main.currentUser.firstName }
    if (newData.lastName === "") { newData.lastName = this.props.user.main.currentUser.lastName }
    if (newData.email === "" || !testing.emailAndUsernameValidation(newData.email)) { newData.email = this.props.user.main.currentUser.email }
    if (newData.emailSecondary === "" || !testing.emailAndUsernameValidation(newData.email)) { newData.emailSecondary = this.props.user.main.currentUser.emailSecondary }
    if (newData.username === "" || testing.emailAndUsernameValidation(newData.username) || newData.username.length < 6 || newData.username.length > 15) { newData.username = this.props.user.main.currentUser.username }
    if (newData.streetAdd === "") { newData.streetAdd = this.props.user.main.currentUser.streetAdd }
    if (newData.city === "") { newData.city = this.props.user.main.currentUser.city }
    if (newData.stateId === "") { newData.stateId = this.props.user.main.currentUser.stateId }
    if (newData.zip === "") { newData.zip = this.props.user.main.currentUser.zip }
    if (newData.phone === "") { newData.phone = this.props.user.main.currentUser.phone }
    if (newData.preferredContact === "") { newData.preferredContact = this.props.user.main.currentUser.preferredContact }
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
          .then(() => {
            this.props.user.refresh()
            this.clearState();
          })
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
    this.setState(user, () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          this.addBlur();
          return (
            <div className="editUserAlert">
              <h1 id="messageEditTitle">Edit Your Info</h1>
              <section className="editUserInputSection">
                <label htmlFor="firstName" className="editUserLabel">First Name</label>
                <input name="firstName" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.firstName}></input>
              </section>
              <section className="editUserInputSection">
                <label htmlFor="lastName" className="editUserLabel">Last Name</label>
                <input name="lastName" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.lastName}></input>
              </section>
              <section className="editUserInputSection">
                <label htmlFor="email" className="editUserLabel">Primary Email</label>
                <input name="email" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.email}></input>
              </section>
              <section className="editUserInputSection">
                <label htmlFor="emailSecondary" className="editUserLabel">Secondary Email</label>
                <input name="emailSecondary" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.emailSecondary} placeholder="Enter an alternate email address."></input>
              </section>
              <section className="editUserInputSection">
                <label htmlFor="username" className="editUserLabel">Username</label>
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

  addNewContact = () => {
    this.addBlur();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="editUserAlert">
            <h1 id="messageEditTitle">Add New Contact</h1>
            <section className="editUserInputSection">
              <label htmlFor="firstName" className="editUserLabel">First Name</label>
              <input name="firstName" className="editUserInput" onChange={this.handleChange} placeholder="Enter first name."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="lastName" className="editUserLabel">Last Name</label>
              <input name="lastName" className="editUserInput" onChange={this.handleChange} placeholder="Enter last name."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="email" className="editUserLabel">Primary Email</label>
              <input name="email" className="editUserInput" onChange={this.handleChange} placeholder="Enter primary email."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="emailSecondary" className="editUserLabel">Secondary Email</label>
              <input name="emailSecondary" className="editUserInput" onChange={this.handleChange} placeholder="Enter an alternate email address."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="streetAdd" className="editUserLabel">Address</label>
              <input name="streetAdd" className="editUserInput" onChange={this.handleChange} placeholder="Enter the street address."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="city" className="editUserLabel">City</label>
              <input name="city" className="editUserInput" onChange={this.handleChange} placeholder="Enter the city."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="stateId" className="editUserLabel">State</label>
              <input name="stateId" className="editUserInput" onChange={this.handleChange} placeholder="Enter the state."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="zip" className="editUserLabel">Zip</label>
              <input name="zip" className="editUserInput" onChange={this.handleChange} placeholder="Enter the zip code."></input>
            </section>
            <section className="editUserInputSection">
              <label htmlFor="phone" className="editUserLabel">Phone</label>
              <input name="phone" className="editUserInput" onChange={this.handleChange} placeholder="Enter the phone number."></input>
            </section>
            <div id="editInfoBtnSection">
              <button className="editInfoBtn" onClick={() => {
                this.clearBlur();
                this.clearState();
                onClose()
              }}>Go Back</button>
              <button className="editInfoBtn" onClick={() => {
                this.clearBlur();
                this.saveNewContact();
                onClose()
              }}>Save Changes</button>
            </div>
          </div>
        )
      }
    })
  }

  editOtherUser = (member) => {
    this.setState(member, () => {
      this.addBlur();
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="editUserAlert">
              <h1 id="messageEditTitle">Edit {this.state.username}'s Info</h1>
              <section className="editOtherUserInputSection">
                <label htmlFor="firstName" className="editOtherUserInfo">{this.state.firstName} {this.state.lastName}</label>
                <label htmlFor="firstName" className="editOtherUserInfo">{this.state.username}</label>
              </section>
              <section className="editUserInputSection">
                <label htmlFor="email" className="editUserLabel">Add Email</label>
                <input name="emailSecondary" className="editUserInput" onChange={this.handleChange} defaultValue={this.state.emailSecondary} placeholder="Enter an alternate email address."></input>
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
              <div id="editInfoBtnSection">
                <button className="editInfoBtn" onClick={() => {
                  this.clearBlur();
                  this.clearState();
                  sessionStorage.removeItem("userInfo")
                  onClose()
                }}>Go Back</button>
                <button className="editInfoBtn" onClick={() => {
                  this.clearBlur();
                  this.saveOtherEdits();
                  onClose()
                }}>Save Changes</button>
              </div>
            </div>
          )
        }
      })
    })
  }

  printMembers = () => {
    let currentUser = parseInt(sessionStorage.getItem("currentUserId"))
    let allUsers = [];
    this.props.user.main.groupMembers.forEach(member =>
      allUsers.push(member))
    this.props.user.main.groupContacts.forEach(member =>
      allUsers.push(member))
    if (allUsers.length > 1) {
      allUsers.sort(function (a, b) {
        return a.firstName.localeCompare(b.firstName);
      });
    }
    return allUsers.map(member => {
      let emailSecondaryTemp = <React.Fragment></React.Fragment>
      if (member.emailSecondary !== "None Provided" || member.emailSecondary !== undefined) {
        if (member.emailSecondary.includes("modified")) {
          emailSecondaryTemp = member.emailSecondary;
          emailSecondaryTemp = member.emailSecondary.split(" ");
          emailSecondaryTemp = <a href={`mailto:${emailSecondaryTemp[0]}`} className="addressEmailLink">Email {emailSecondaryTemp[0]}</a>
        } else {
          emailSecondaryTemp = <a href={`mailto:${member.emailSecondary}`} className="addressEmailLink">Email {member.emailSecondary}</a>
        }
      if (member.type === "user") {
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
                <p className="addressSectionLabel">Address</p>
                <p className="addressFullLine">{member.streetAdd}</p>
              </section>
              <section className="addressBookSection">
                <p className="addressSectionLabel"></p>
                <p className="addressFullLine">{member.city}, {member.stateId} {member.zip}</p>
              </section>
              <section className="addressBookSectionEmail">
                <a href={`mailto:${member.email}`} className="addressEmailLink">Email {member.email}</a>
                {emailSecondaryTemp}
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
                <p className="addressSectionLabel">Address</p>
                <p className="addressFullLine">{member.streetAdd}</p>
              </section>
              <section className="addressBookSection">
                <p className="addressSectionLabel"></p>
                <p className="addressFullLine">{member.city}, {member.stateId} {member.zip}</p>
              </section>
              <section className="addressBookSectionEmail">
                <a href={`mailto:${member.email}`} className="addressEmailLink">Email {member.email}</a>
                {emailSecondaryTemp}
              </section>
              <p className="addressJoinedGroupGuru">You Joined Group Guru {moment(member.accountCreationDate).fromNow()}</p>
              <section className="addressBookSectionBtns">
                <button className="addressIndivMemberBtn" value={member} onClick={() => this.editMyInfo(member)}>Edit My Info</button>
              </section>
            </div>
          )
        }
      } else {
        return (
          <div className="userAddressCard" key={member.id + "contact"}>
            <section className="addressBookSection">
              <p className="addressFullLine">{member.firstName} {member.lastName}</p>
              <p className="memberLastOnline">Contact Card</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Phone</p>
              <p className="addressFullLine">{member.phone}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel">Address</p>
              <p className="addressFullLine">{member.streetAdd}</p>
            </section>
            <section className="addressBookSection">
              <p className="addressSectionLabel"></p>
              <p className="addressFullLine">{member.city}, {member.stateId} {member.zip}</p>
            </section>
            <section className="addressBookSectionEmail">
              <a href={`mailto:${member.email}`} className="addressEmailLink">Email {member.email}</a>
              {emailSecondaryTemp}
            </section>
            <section className="addressBookSectionBtns">
              <button className="addressIndivMemberBtn" value={member} onClick={() => this.editContactInfo(member)}>Edit My Info</button>
            </section>
          </div>
        )
      }
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
          <p id="mainAddressBookTitle">Address Book
          <button id="addContactBtn" onClick={this.addNewContact}>Add Contact</button>
          </p>
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

