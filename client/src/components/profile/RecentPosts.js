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
    const posts = this.state.posts.map(post => (
      <Post data={post} id={post._id} />
    ));
    return (
      <div>
        <div>Recent Posts:</div>
        <ul>{posts}</ul>
      </div>
    );
  }
}
