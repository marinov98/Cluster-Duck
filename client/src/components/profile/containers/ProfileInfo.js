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
    if (this.state.admin) {
      return (
        <div className="row">
          <Media heading style={{ fontSize: "35px" }}>
            <Badge color="danger">Admin</Badge>
          </Media>
        </div>
      );
    } else {
      return "";
    }
  };

  displayUsername = () => {
    if (this.props.data.username !== this.props.data.email) {
      return (
        <div className="row">
          <Media heading style={{ fontSize: "35px" }}>
            <Badge style={{ marginRight: "4px" }} color="warning">
              Username{" "}
            </Badge>
            {` ${this.props.data.username}`}
          </Media>
        </div>
      );
    }
  };

  render() {
    const { firstName = "", lastName = "", email = "" } = this.props.data;
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
              <Badge color="success">Email</Badge> {email}
            </Media>
          </div>
          {this.displayUsername()}
          {this.displayAdminStatus()}
        </div>
      </Media>
    );
  }
}
