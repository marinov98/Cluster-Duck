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
        <h2>Title: {title}</h2>
        <h3>Class/Topic: {csTopic}</h3>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ margin: "10px" }}
        >
          View Post
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <Card>
            <CardBody className="description">Description: {text}</CardBody>
          </Card>
        </Collapse>
      </li>
    );
  }
}
