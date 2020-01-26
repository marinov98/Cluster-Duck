//layout of an individual post

import React from 'react';
import { Badge } from 'reactstrap';
import moment from 'moment';
// import t from "./testfeeds";
import './feedPost.css';

// const b = t.body;

export default function FeedPost(props) {
  let post = props.post;
  return (
    <div className="PostContainer">
      <div className="Poster">{post.anonymity ? post.poster : "Anonymous"}</div>
      <div className="TimeStamp">{"Posted " + moment(post.created).fromNow()}</div>
      <div className="Topic"><Badge color="secondary">{post.csTopic}</Badge></div>
      <div className="Title">{post.title}</div>
      <div className="PostText">{post.text}</div>
      <div className="Rating">{"Rating: " + (post.upVotes.length - post.downVotes.length)}</div>
      <div className="Replies">{post.replies.length + " replies"}</div>
    </div>
  );
}