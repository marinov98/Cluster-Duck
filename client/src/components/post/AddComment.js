import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.postId,
      userEmail: this.props.userEmail,
      text: ""
    };
  }

  render() {
    return (
      <div>
        <h1 className="title">Reply to this post</h1>
        <h3 className="title">
          Please make sure your post is constructive and remember that we are
          trying to better the community
        </h3>
        <Form>
          <FormGroup className="form-box">
            <Label for="Description">Description</Label>
            <Input
              type="textarea"
              name="text"
              className="form-box-input"
              placeholder="I need help in..."
              onChange={this.handleChange}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
