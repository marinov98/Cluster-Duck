import React, { Component } from "react";
import { Collapse, Button, Card, CardBody } from "reactstrap";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({ isOpen: prevState.isOpen }));
  };

  render() {
    const { title, text, csTopic, _id } = this.props;

    return (
      <li className={`post  ${_id}`}>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Toggle Description
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <p>{title}</p>
          <p>{csTopic}</p>
          <Card>
            <CardBody>{text}</CardBody>
          </Card>
        </Collapse>
      </li>
    );
  }
}
