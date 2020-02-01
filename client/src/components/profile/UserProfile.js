import React, { Component } from "react";
import ProfileInfo from "./containers/ProfileInfo.js";
// import ProfileClasses from "./containers/ProfileClasses.js";
import RecentPosts from "./RecentPosts.js";
import { Spinner } from "reactstrap";
import axios from "axios";
import "./UserProfile.css";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      user: {}
    };
  }

  // pull user profile using their email
  componentDidMount = async () => {
    try {
      const { email } = this.props.match.params;
      const { data } = await axios.get(
        `http://localhost:4004/api/users/user/${email}`
      );

      // redirect to homepage if email is invalid
      if (data === null) this.props.history.push("/");
      else this.setState({ user: data });
    } catch (err) {
      console.error(err);
    }
  };

  displayUserInfo = () => {
    if (this.state.user !== null && this.state.user.email)
      return <ProfileInfo data={this.state.user} />;
    else
      return (
        <Spinner
          color="primary"
          style={{ width: "10rem", height: "10rem" }}
          type="grow"
        />
      );
  };

  displayPostsInfo = () => {
    if (this.state.user !== null && this.state.user.posts)
      return <RecentPosts className="user-info" data={this.state.user} />;
    else
      return <Spinner style={{ width: "6rem", height: "6rem" }} color="info" />;
  };

  render() {
    return (
      <div className="user-profile">
        <div className="user-info">{this.displayUserInfo()}</div>
        <div className="user-posts" style={{ textAlign: "center" }}>
          {this.displayPostsInfo()}
        </div>
      </div>
    );
  }
}
