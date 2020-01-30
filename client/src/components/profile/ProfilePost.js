import React, { Component } from "react";
import { Collapse, Button, Card, CardBody } from "reactstrap";
import "./Post.css";

export default class ProfilePost extends Component {
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
        <h4>{title}</h4>
        <p>{csTopic}</p>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ margin: "10px" }}
        >
          View description
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
