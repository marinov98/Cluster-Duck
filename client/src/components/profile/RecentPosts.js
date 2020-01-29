import React, { Component } from "react";
import Post from "./Post";
import "./RecentPosts.css";

export default class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.data
    };
  }

  render() {
    const posts = this.state.posts.map((post, rank) => (
      <Post data={post} key={rank + 1} />
    ));
    return (
      <div>
        <h3>Recent Posts:</h3>
        <ul>{posts}</ul>
      </div>
    );
  }
}
