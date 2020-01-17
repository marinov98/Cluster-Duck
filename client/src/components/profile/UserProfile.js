import React, { Component } from "react";
import ProfileInfo from "./containers/ProfileInfo.js";
import ProfileClasses from "./containers/ProfileClasses.js";
import RecentPosts from "./RecentPosts.js";
import sampleImage from "./sampleImage.jpg";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_info: this.props.profile_info,
      current_classes: this.props.current_classes,
      past_classes: this.props.past_classes
    };
  }

  render() {
    console.log(this.state.profile_info);
    console.log(this.state.current_classes);
    console.log(this.state.past_classes);
    let sample_profile_data = {
      name: "Cluster",
      lastname: "duck",
      year: "2nd",
      major: "clustering"
    };
    let sample_current_data = ["swimming", "waddling", "flying"];
    let sample_past_data = ["swimming", "waddling", "flying"];
    let sample_posts = ["lorem", "ipsum"];
    return (
      <div>
        {/* Navbar */}
        <RecentPosts 
        	posts={sample_posts}
        	 />
       	<div
       		style={{
            padding: "100px",
        }}>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            border: "50px",
            marginLeft: "-50vw",
            position: "relative",
            backgroundColor: "#ffffff",
            width: "200px"
          }}
        >
          {/* Profile image 
					input: image object retrieved from remote file storage into image tag
					output: image */}
          <img src={sampleImage} alt={"DuckImg"} height={"75px"} width={"100px"} />
          <div style={{ 
          	color: "black" }}>
            {/* Profile Info 
					input: object
					output: column + row with identifiers points */}
            <ProfileInfo data={sample_profile_data} />
          </div>

          <div style={{
          	color: "black" }}>
            {/* Current Classes 
					input: object
					output: column + row with bulleted points */}
            <ProfileClasses classType={"Current"} classes={sample_current_data} />
          </div>

          <div style={{
          	color: "black" }}>
            {/* Past Classes 
					input: object
					output: column + row with bulleted points */}
            <ProfileClasses classType={"Past"} classes={sample_past_data} />
          </div>
        </div>
        </div>
        {/* Recent Posts
				input: object
				output: list of most recent posts */}
      </div>
    );
  }
}
