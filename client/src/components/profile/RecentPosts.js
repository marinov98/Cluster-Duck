import React, { Component } from "react";

export default class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts
    };
  }

  render() {
    return (
      <div>
        <div>Recent Posts</div>
      </div>
    );
  }
}
