//Layout of feed container!!!

import React, { Component } from "react";
import { Button, Jumbotron } from "reactstrap";
import FeedPost from "./feedPost";
import PostQuestion from "./PostQuestion";
// import axios from 'axios'
import "./FeedContainer.css";

// const POST_URL = "https://cluster-duck-server.herokuapp.com/api/posts";

export default class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  displayForm = () => {
    if (this.state.toggle)
      return <PostQuestion toggle={this.toggle} auth={this.props.auth} />;
  };

  render() {
    const allPosts = this.props.posts.map((p, rank) => (
      <FeedPost post={p} key={rank + 1} />
    ));
    return (
      <div className="feedContainer">
        <Jumbotron>
          <h1>Welcome to your feed!</h1>
        </Jumbotron>
        <Button style={{ margin: "10px" }} size="lg" onClick={this.toggle}>
          Post a question
        </Button>
        {this.displayForm()}
        <ul style={{ listStyleType: "none" }} className="posts">
          {allPosts}
        </ul>
      </div>
    );
  }
}
