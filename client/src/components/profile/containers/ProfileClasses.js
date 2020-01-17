import React, { Component } from "react";

export default class ProfileClasses extends Component {

	constructor(props){
	super(props);
		this.state={
			classtype: this.props.classType
		}
	}
	render(){
		console.log("Pclasses");

		return (
			<div>
				<div>{this.props.classType} classes</div>
			</div>
		);
	}
}
