import React, { Component } from "react";
import LeaderboardCard from "./LeaderboardCard.js";
import { Jumbotron, Container, Spinner } from "reactstrap";
import axios from "axios";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get("/api/users/");
      // sort by who made the most posts
      data.sort((user, user2) => user2.posts.length - user.posts.length);
      if (data !== null) this.setState({ users: data });
      else this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  displayUsers = () => {
    if (this.state.users !== null && this.state.users[0]) {
      const users = this.state.users
        .slice(0, 10)
        .map((user, rank) => (
          <LeaderboardCard user={user} rank={rank + 1} key={rank + 1} />
        ));
      return users;
    } else
      return (
        <Spinner style={{ width: "10rem", height: "10rem" }} color="primary" />
      );
  };

  render() {
    return (
      <Container style={{ textAlign: "center", paddingTop: "20px" }}>
        <Jumbotron>
          <h1>Leaderboard</h1>
          <h4>Top Contributors to ClusterDuck This Week!</h4>
        </Jumbotron>
        {this.displayUsers()}
      </Container>
    );
  }
}
