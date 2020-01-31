import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.postId,
      userEmail: this.props.userEmail,
      text: ''
    };
  }

  refreshPage = () => {
    window.location.reload();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    try {
      event.preventDefault();
      if (this.state.text === '') window.alert('Text field cannot be empty!');
      else {
        const replyToBeCreated = this.state;

        await axios.post(
          `https://cluster-duck-server.herokuapp.com/api/replies/`,
          replyToBeCreated
        );

        this.props.toggle();
        // clear text area and refresh page
        this.setState({ text: '' });
        this.refreshPage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <h1 className="title">Reply to this post</h1>
        <h3 className="title">
          Please make sure your post is constructive and remember that we are trying to better the
          community
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="form-box">
            <Label for="Description">Description</Label>
            <Input
              type="textarea"
              name="text"
              className="form-box-input"
              placeholder="My answer is..."
              onChange={this.handleChange}
            />
          </FormGroup>
          <div style={{ textAlign: 'center' }}>
            <Button className="submit form-box" size="lg" style={{ align: 'center' }} type="submit">
              Reply
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
