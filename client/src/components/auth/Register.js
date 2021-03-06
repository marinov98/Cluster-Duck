import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  FormText,
  Alert,
  Label
} from "reactstrap";
import { registerUser } from "./../../utils/auth";
import "./Register.css";

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
      isAdmin: false,
      errors: ""
    };
  }

  componentDidMount = () => {
    if (this.props.auth.authenticated) this.props.history.push("/"); // redirect to homepage if already registered
  };

  displayErrors = () => {
    if (this.state.errors !== "")
      return <Alert color="danger">{this.state.errors}</Alert>;
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // check if email is valid

    // if its valid, register the user
    const userToBeCreated = {
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: this.state.isAdmin
    };

    // attempt to add to database
    try {
      const response = await registerUser(userToBeCreated, this.props.history);
      // unsuccessful registration, show errors to client
      if (response && response.error) this.setState({ errors: response.error });
    } catch (err) {
      console.error(err);
    }
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
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                className="form-box-input"
                placeholder="example@example.com"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="firsName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                className="form-box-input"
                placeholder="firstName"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                className="form-box-input"
                placeholder="lastName"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                className="form-box-input"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                className="form-box-input"
                placeholder="*************"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="confirmedPassword">Re-type Password</Label>
              <Input
                type="password"
                name="confirmedPassword"
                className="form-box-input"
                placeholder="*************"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-box">
              <Label for="isAdmin">Are you applying to be an Admin? </Label>
              <select
                id="register-selector"
                defaultValue="No"
                onChange={this.handleAdmin}
                style={{ margin: "8px" }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </FormGroup>
            <FormText className="form-box-error">
              {this.displayErrors()}
            </FormText>
            <Button
              className="submit form-box"
              size="lg"
              style={{ align: "center" }}
              type="submit"
            >
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
