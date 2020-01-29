//Layout of feed container!!!

import React, { Component } from "react";
import { Button, Jumbotron, Collapse } from "reactstrap";
import FeedPost from "./feedPost";
import PostQuestion from "./PostQuestion";
import "./FeedContainer.css";

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

  // displayForm = () => {
  //   if (this.state.toggle)
  //     return <PostQuestion toggle={this.toggle} auth={this.props.auth} />;
  // };

  render() {
    const allPosts = this.props.posts.map((p, rank) => (
      <FeedPost post={p} key={rank + 1} />
    ));
    return (
      <div className="feedContainer">
        <Jumbotron>
          <h1>Welcome to your feed!</h1>
        </Jumbotron>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button style={{ margin: "10px" }} size="lg" onClick={this.toggle}>
            Post a question
          </Button>
        </div>
        <Collapse isOpen={this.state.toggle}>
          <PostQuestion toggle={this.toggle} auth={this.props.auth} />;
        </Collapse>
        <ul style={{ listStyleType: "none" }} className="posts">
          {allPosts}
        </ul>
      </div>
    );
  }
}
