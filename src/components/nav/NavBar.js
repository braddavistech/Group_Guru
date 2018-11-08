import React, { Component } from "react"
import { Link } from "react-router-dom"
// import APIcalls from "../../modules/APIcalls"
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

  state = {

  }

  render() {
    return (
      <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>
          </ul>
      </nav>
        )
      }

    }

export default NavBar