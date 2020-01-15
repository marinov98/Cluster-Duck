import React, { Component } from "react";

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

			<div> "Hello World!" </div> 
		);
	}
}

