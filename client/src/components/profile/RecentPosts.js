import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import "./RecentPosts.css";

export default class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      posts: []
    };
  }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(
        `https://cluster-duck-server.herokuapp.com/api/users/${this.state.user._id}/posts`
      );
      this.setState({ posts: data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    // get first 5 posts
    const posts = this.state.posts
      .slice(0, 5)
      .map((post, rank) => <Post data={post} key={rank + 1} />);
    return (
      <div>
        <h3>
          <span className="badge badge-primary">Recent Posts:</span>
        </h3>
        <ul style={{ padding: 0, listStyleType: "none" }}>{posts}</ul>
      </div>
    );
  }
}
