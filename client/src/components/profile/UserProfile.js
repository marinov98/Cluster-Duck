import React, { Component } from "react";
import ProfileInfo from "./containers/ProfileInfo.js";
// import ProfileClasses from "./containers/ProfileClasses.js";
// import RecentPosts from "./RecentPosts.js";
import sampleImage from "./sampleImage.jpg";
import axios from "axios";

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
        `https://cluster-duck-server.herokuapp.com/api/users/user/${email}`
      );

      // redirect to homepage if email is invalid
      if (data === null) this.props.history.push("/");
      else this.setState({ user: data });
    } catch (err) {
      console.error(err);
    }
  };

  displayInfo = () => {
    if (this.state.user !== null && this.state.user.email)
      return <ProfileInfo data={this.state.user} />;
  };

  render() {
    return (
      <div>
        <div
          style={{
            textAlign: "center"
          }}
        >
          {/* Profile image 
						input: image object retrieved from remote file storage into image tag
						output: image */}
          <img
            src={sampleImage}
            alt={"DuckImg"}
            height={"75px"}
            width={"100px"}
          />
          <div
            style={{
              color: "black"
            }}
          >
            {this.displayInfo()}
          </div>

          <div
            style={{
              color: "black"
            }}
          ></div>

          <div
            style={{
              color: "black"
            }}
          ></div>
        </div>
      </div>
    );
  }
}
