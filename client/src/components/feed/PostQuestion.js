import React, { Component } from "react";
import { Form, Input, FormGroup, Label, Button } from "reactstrap";
import axios from "axios";

export default class PostQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "(No title)",
      csTopic: "General",
      text: "",
      auth: this.props.auth,
      userId: ""
    };
  }

  componentDidMount = async () => {
    try {
      if (!this.state.auth.user.id) {
        const { data } = await axios.get(
          `https://cluster-duck-server.herokuapp.com/api/users/user/${this.props.auth.user.email}`
        );

        this.setState({ userId: data._id });
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      if (this.state.text !== "") {
        const postToBeCreated = this.state;

        await axios.post(
          "https://cluster-duck-server.herokuapp.com/api/posts/",
          postToBeCreated
        );

        this.props.toggle();
      } else window.alert("Description cannot be empty!");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <h1 className="title">Ask a Question</h1>
        <h3 className="title">
          Our cs community will try to answer as best we can
        </h3>
        <Form className="form" onSubmit={this.handleSubmit}>
          <FormGroup className="form-box">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              className="form-box-input"
              placeholder="Title"
              onChange={this.handleChange}
            />
          </FormGroup>
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
          <FormGroup className="form-box">
            <Label for="lastName">Topic </Label>
            <select
              type="select"
              name="csTopic"
              defaultValue="General"
              style={{ margin: "5px" }}
              onChange={this.handleChange}
            >
              <option>General</option>
              <option>CSCI-127</option>
              <option>CSCI-135</option>
              <option>CSCI-136</option>
              <option>CSCI-150</option>
              <option>CSCI-160</option>
              <option>CSCI-235</option>
              <option>CSCI-260</option>
              <option>CSCI-265</option>
              <option>CSCI-335</option>
              <option>CSCI-340</option>
              <option>CSCI-Electives</option>
            </select>
          </FormGroup>
          <div style={{ textAlign: "center" }}>
            <Button
              className="submit form-box"
              size="lg"
              style={{ align: "center" }}
              type="submit"
            >
              Submit Question
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
