import React, { Component } from "react";
import LeaderboardCard from "./LeaderboardCard.js";
import { Jumbotron, Container } from "reactstrap";
import axios from "axios";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentWillMount() {
    axios
      .get("https://cluster-duck-server.herokuapp.com/api/users/")
      .then(res => {
        this.setState({ users: res.data });
      });
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Leaderboard</h1>
          <h4>Top Contributors to ClusterDuck This Week!</h4>
        </Jumbotron>
        {this.state.users.map((user, rank) => {
          return <LeaderboardCard user={user} key={rank + 1} />;
        })}
      </Container>
    );
  }
}
