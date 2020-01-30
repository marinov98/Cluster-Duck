import React, { Component } from "react";
import { Collapse, Button, Card, CardBody } from "reactstrap";
import "./Post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { title, text, csTopic, _id } = this.props.data;

    return (
      <li className={`post  ${_id}`}>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ margin: "10px" }}
        >
          View Post
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <p>Title: {title}</p>
          <p>Class/Topic: {csTopic}</p>
          <Card>
            <CardBody className="description">Description: {text}</CardBody>
          </Card>
        </Collapse>
      </li>
    );
  }
}
