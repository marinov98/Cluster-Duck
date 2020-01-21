import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { registerUser } from "./../../utils/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmedPassword: "",
      isAdmin: false
    };
  }

  componentDidMount = () => {
    if (this.props.auth.authenticated) this.props.history.push("/"); // redirect to homepage if already registered
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userToBeCreated = {
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: this.state.isAdmin
    };

    registerUser(userToBeCreated, this.props.history);
  };

  handleAdmin = event => {
    if (event.target.value === "Yes") this.setState({ isAdmin: true });
    else this.setState({ isAdmin: false });
  };

  render() {
    return (
      <div className="background" id="register-form">
        <div className="form-container">
          <h1 className="tite">ClusterDuck</h1>
          <h3 className="signup-message">
            Sign up and contribute to the Hunter CS community!
          </h3>
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormGroup className="form-box">
              <Input
                type="text"
                name="firstName"
                className="form-box-input"
                placeholder="firstName"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Input
                type="text"
                name="lastName"
                className="form-box-input"
                placeholder="lastName"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Input
                type="text"
                name="username"
                className="form-box-input"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Input
                type="email"
                name="email"
                className="form-box-input"
                placeholder="email@email"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Input
                type="password"
                name="password"
                className="form-box-input"
                placeholder="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Input
                type="password"
                name="confirmedPassword"
                className="form-box-input"
                placeholder="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <select defaultValue="No" onChange={this.handleAdmin}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <FormText className="form-box-error"></FormText>
            <Button className="submit" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="signed-box">
            Already Registered? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  confirmedPassword: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default withRouter(Register);
