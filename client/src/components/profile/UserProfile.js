import React, { Component } from "react";
import ProfileInfo from "./containers/ProfileInfo.js";
import ProfileClasses from "./containers/ProfileClasses.js";
import RecentPosts from "./RecentPosts.js";

export default class UserProfile extends Component {
	constructor(props){
		super(props);
		this.state={
				profile_info:this.props.profile_info,
				current_classes:this.props.current_classes,
				past_classes: this.props.past_classes
			};
	}

	render() {
			console.log(this.state.profile_info)
			console.log(this.state.current_classes)
			console.log(this.state.past_classes)
		return (
			<div>
			{/* Navbar */}
			<div> "Hello World!" </div> 
				<img />
			{/* Profile image 
				input: image object retrieved from remote file storage into image tag
				output: image */}
				<div>

			{/* Profile Info 
				input: object
				output: column + row with identifiers points */}
					<ProfileInfo />
				</div>

				<div>
			{/* Current Classes 
				input: object
				output: column + row with bulleted points */}
					<ProfileClasses classType={"Current"}/>
				</div>

				<div>
			{/* Past Classes 
				input: object
				output: column + row with bulleted points */}
					<ProfileClasses classType={"Past"}/>
				</div>
			{/* Recent Posts
				input: object
				output: list of most recent posts */}	
				<RecentPosts posts={["lorem,ipsum"]}/>
			</div>
		);
	}
}

// create containers
