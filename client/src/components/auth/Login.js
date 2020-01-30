import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { loginUser, loginUserGoogle } from "./../../utils/auth";
import "../../App.css";
import "./Login.css";
import {
  Container,
  Jumbotron,
  Button,
  Form,
  FormText,
  Input,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

const responseGoogleGood = async response => {
  try {
    // Send user info to backend
    const user = {
      email: response.profileObj.email,
      password: response.accessToken,
      username: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      token: response.Zi.id_token
    };

    // might also want to push history
    return await loginUserGoogle(user);
  } catch (err) {
    console.error(err);
  }
};

const responseGoogleBad = response => {
  alert("Login failed!");
  console.log("Something is wrong with login...", response);
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      email: "",
      password: "",
      errors: ""
    };
  }

  componentDidMount = () => {
    // redirect user to homepage if authenticated
    if (this.props.auth.authenticated) this.props.history.push("/");
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

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    const userInfo = await loginUser(user);
    // check for errors or redirect to home if authenticated
    if (userInfo) {
      if (userInfo.error) this.setState({ errors: userInfo.error });
      else if (userInfo.authenticated) {
        this.setState({ auth: userInfo });
        this.props.getAuth(userInfo);
        this.props.history.push("/");
      }
    }
  };

  handleGoogleLogin = async response => {
    try {
      const userInfo = await responseGoogleGood(response);
      this.setState({ auth: userInfo });
      this.props.getAuth(userInfo);
      if (userInfo.authenticated) this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3">Welcome to ClusterDuck!</h1>
          <p>
            A webstite aimed to better the computer science community at Hunter
            College and allow computer science students to help each other{" "}
          </p>
        </Jumbotron>
        <Form className="form" onSubmit={this.handleSubmit}>
          <FormGroup className="form-box">
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              className="form-box-input"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className="form-box">
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="**********"
              className="form-box-input"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormText className="form-box-error">{this.displayErrors()}</FormText>
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
          <div className="form-button">
            <Button size="lg">Log In</Button>
          </div>
          <div className="google-login">
            <GoogleLogin
              clientId="1041011900309-oaq4n0svcmrocdf4q3q9hdgpudlfllfs.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                  className="login-button"
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{ margin: "10px", textAlign: "center" }}
                >
                  Login with Google
                </Button>
              )}
              buttonText="Login"
              className="google-login"
              onSuccess={this.handleGoogleLogin}
              onFailure={responseGoogleBad}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);
