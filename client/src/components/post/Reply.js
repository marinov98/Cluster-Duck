import React, { Component } from "react";

export default class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <li
        style={{
          border: "1px solid black",
          margin: "10px",
          float: "left",
          width: "100%"
        }}
      >
        <p style={{ color: "blue" }}>{this.props.data.userEmail}</p>
        <p>{this.props.data.text}</p>
      </li>
    );
  }
}
