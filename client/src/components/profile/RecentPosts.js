import React, { Component } from "react";
import Post from "./Post";

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
        <div>Recent Posts:</div>
        <ul>{posts}</ul>
      </div>
    );
  }
}
