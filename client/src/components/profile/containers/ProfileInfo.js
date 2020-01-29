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
      <Media className="profile-info row">
        <Media body className="image-body col-lg-3">
          <Media heading>
            <img
              src={sampleImage}
              alt={"DuckImg"}
              height={"175px"}
              width={"175px"}
            />
          </Media>
          <Media heading style={{ fontSize: "45px" }}>
            <Badge color="primary">
              {firstName} {lastName}
            </Badge>
          </Media>
        </Media>
        <div className="col-sm-6 details">
          <div className="row">
            <Media heading style={{ fontSize: "35px" }}>
              <Badge color="success">Email:</Badge> {email}
            </Media>
          </div>
          <div className="row">
            <Media heading style={{ fontSize: "35px" }}>
              <Badge color="danger">Admin Status: </Badge>
              {this.displayAdminStatus()}
            </Media>
          </div>
        </div>
      </Media>
    );
  }
}
