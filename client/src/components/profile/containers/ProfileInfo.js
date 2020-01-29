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
    if (!this.state.isAdmin) return " This User is Non-Admin";
    else return " This User is Admin";
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
        <Media body className="image-body row">
          <div className="col-6">
            <Media heading>
              <img
                src={sampleImage}
                alt={"DuckImg"}
                height={"175px"}
                width={"175px"}
              />
            </Media>
          </div>
          <div className="col user-names">
            <Media heading>
              <Badge color="primary">
                {firstName} {lastName}
              </Badge>
            </Media>
          </div>
        </Media>
        <Media body className="row">
          <div className="col details">
            <Media heading>
              <Badge color="success">Email:</Badge> {email}
            </Media>
            <Media heading>
              <Badge color="danger">Admin Status: </Badge>
              {this.displayAdminStatus()}
            </Media>
          </div>
        </Media>
      </Media>
    );
  }
}
