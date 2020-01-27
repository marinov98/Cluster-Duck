import React, { Component } from "react";

export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.data.isAdmin
    };
  }

  displayAdminStatus = () => {
    if (!this.state.isAdmin) return <h3>This User is not an Admin</h3>;
    else return <h3>This user is an admin</h3>;
  };

  render() {
    const {
      firstName = "",
      lastName = "",
      email = ""
      // username = "",
      //posts = []
    } = this.props.data;

    return (
      <div className="user-info">
        <div className="row names">
          <div className="col">
            <h1>{firstName}</h1>
          </div>
          <div className="col">
            <h1>{lastName}</h1>
          </div>
        </div>
        <div className="row user-email">
          <h2>{email}</h2>
        </div>
        <div className="row">{this.displayAdminStatus()}</div>
      </div>
    );
  }
}
