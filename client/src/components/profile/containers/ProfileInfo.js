import React, { Component } from "react";

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      lastname: this.props.data.lastname,
      year: this.props.data.year,
      major: this.props.data.major
    };
  }
  render() {
    console.log("pInfo");

    return (
    <div style={{
    		marginLeft: "50px"
    	}}>
      <div style={{ 
      		fontSize: "14px", 
      		textAlign: "left"
      		}}>
        <div>Name: {this.state.name} </div>
        <div>Lastname: {this.state.lastname} </div>
        <div>Year: {this.state.year} </div>
        <div>Major: {this.state.major} </div>
      </div>
    </div>
    );
  }
}
