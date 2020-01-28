//layout of an individual post

import React from 'react';
import { Badge, Card } from 'reactstrap';
import moment from 'moment';
// import t from "./testfeeds";
import './feedPost.css';

// const b = t.body;

export default function FeedPost(props) {
  let { post } = props;

  

  return (
    <Card className="postContainer" >
      <div className="heading">
        <h1 className="title">{post.title}</h1>
        <div className="poster">{post.anonymity ? post.poster : "Anonymous"}</div>
        <div className="timeStamp"><small>{"Posted " + moment(post.createdAt).fromNow()}</small></div>
        <div className="topic"><Badge color="secondary">{post.csTopic}</Badge></div>
      </div>
      <div className="postText">{post.text}</div>
      <div className="footing">
        <div className="rating">{"Rating: " + (post.upVotes.length - post.downVotes.length)}</div>
        <div className="replies">{post.replies.length + " replies"}</div>
      </div>
    </Card>
  );
}