import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';

const responseGoogleGood = (response) => {
  // Send web token to backend
  console.log("Successful login!", response);
}

const responseGoogleBad = (response) => {
  console.log("Something is wrong with login...", response);
}

export default class Login extends Component {
  render() {
    return(
      <div>
        <GoogleLogin
          clientId="1041011900309-oaq4n0svcmrocdf4q3q9hdgpudlfllfs.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          )}
          buttonText="Login"
          onSuccess={responseGoogleGood}
          onFailure={responseGoogleBad}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}
