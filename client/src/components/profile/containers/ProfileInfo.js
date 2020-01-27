import React, { Component } from "react";
import "./ProfileInfo.css";
import sampleImage from "./../sampleImage.jpg";
import { Media, Badge } from "reactstrap";

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.data.isAdmin
    };
  }

  displayAdminStatus = () => {
    if (!this.state.isAdmin) return " Non-Admin";
    else return " Admin";
  };

  render() {
    const {
      firstName = "",
      lastName = "",
      email = ""
      // username = "",
      //posts = []
    } = this.props.data;
    return (
      <Media className="profile-info">
        <Media body>
          <Media heading>
            <img
              src={sampleImage}
              alt={"DuckImg"}
              height={"75px"}
              width={"100px"}
            />
          </Media>
          <Media heading>
            <Badge color="primary">
              {firstName} {lastName}
            </Badge>
          </Media>
          <Media heading>
            <Badge color="success">Email:</Badge> {email}
          </Media>
          <Media heading>
            <Badge color="danger">Admin Status: </Badge>
            {this.displayAdminStatus()}
          </Media>
        </Media>
      </Media>
    );
  }
}
