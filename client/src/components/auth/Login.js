import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import { Container, Jumbotron, Button } from 'reactstrap';
import '../../App.css';
const axios = require('axios').default;

const responseGoogleGood = (response) => {
  // Send web token to backend
  console.log("Successful login!", response);
  let tokenStr = response.Zi.id_token
  let webApiUrl = '??'
  axios.get(webApiUrl, {
    headers: {
      'Authorization' : `Bearer ${tokenStr}`
    }
  })
  .then((response) => {
    var response = response.data;
  },
  (error) => {
    var status = error.response.status
  });
}

const responseGoogleBad = (response) => {
  alert("Login failed!");
  console.log("Something is wrong with login...", response);
}

export default class Login extends Component {
  render() {
    return(
      <Container>
        <Jumbotron>
          <h1 className="display-3">Welcome to ClusterDuck!</h1>
          <p>This is literally the coolest website in existence atm.</p>
        </Jumbotron>
        <GoogleLogin
          clientId="1041011900309-oaq4n0svcmrocdf4q3q9hdgpudlfllfs.apps.googleusercontent.com"
          render={renderProps => (
              <Button
                className="login-button"
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login to ClusterDuck
              </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogleGood}
          onFailure={responseGoogleBad}
          cookiePolicy={'single_host_origin'}
        />
      </Container>
    );
  }
}
