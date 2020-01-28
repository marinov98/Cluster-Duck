//Layout of feed container!!!

import React from "react";
import { Button, Jumbotron } from "reactstrap";
import FeedPost from "./feedPost";
// import axios from 'axios'
import "./FeedContainer.css";

// const POST_URL = "https://cluster-duck-server.herokuapp.com/api/posts";

export default function FeedContainer(props) {
  return (
    <div className="feedContainer">
      {/* { list of shits from user state} */}
      <Jumbotron>
        <h1>Welcome to your feed!</h1>
      </Jumbotron>
      <Button>New Post</Button>
      <div className="posts">
        {props.posts.map((p, rank) => {
          return <FeedPost post={p} key={rank + 1} />;
        })}
      </div>
    </div>
  );
}
