import React, { Component } from "react";
import axios from "axios";
import ProfilePost from "./ProfilePost";
import "./RecentPosts.css";

export default class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      posts: null
    };
  }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(
        `/api/users/${this.state.user._id}/posts`
      );

      // make sure no anonymouse posts are shown and  make sure posts are recent
      const noAnonymous = data.filter(post => post.anonymity !== true);
      noAnonymous.sort(
        (post1, post2) =>
          new Date(post2.createdAt).getTime() -
          new Date(post1.createdAt).getTime()
      );

      this.setState({ posts: noAnonymous });
    } catch (err) {
      console.error(err);
    }
  };

  displayPosts = () => {
    if (this.state.posts !== null && this.state.posts.length === 0)
      return <h4>This user has no posts</h4>;
    else if (this.state.posts !== null) {
      // get first 5 posts
      const posts = this.state.posts
        .slice(0, 5)
        .map((post, rank) => <ProfilePost data={post} key={rank + 1} />);

      return <ul style={{ padding: 0, listStyleType: "none" }}>{posts}</ul>;
    }
  };

  render() {
    return (
      <div>
        <h3>
          <span className="badge badge-secondary">Recent Posts:</span>
        </h3>
        {this.displayPosts()}
      </div>
    );
  }
}
