import React, {	Component }	from "react";

export default class RecentPosts extends Component {
	constructor(props){
		super(props);
		this.state={
				posts: this.props.posts
			};
	}

// data as rows and columns
	render() {
		console.log(this.state.posts)

		return(
			<div />
		
		);
	}
}