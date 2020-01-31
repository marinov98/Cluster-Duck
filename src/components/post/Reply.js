import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
        <Link to={`/profile/${this.props.data.userEmail}`} style={{ color: "blue" }}>{this.props.data.userEmail}</Link>
        <p>{this.props.data.text}</p>
      </li>
    );
  }
}
