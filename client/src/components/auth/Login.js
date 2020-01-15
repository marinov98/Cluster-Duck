import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';

export default class Login extends Component {
  render() {
    <React.Fragment>
      <GoogleLogin
        clientId="1041011900309-m7q81mcbv6j6cnbaba03v9n9fs0d4iga.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />,
      document.getElementById('googleButton')
    </React.Fragment>
  }
}
