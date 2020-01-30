//layout of an individual post

import React, { Component } from "react";
import { Badge, Card } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
// import t from "./testfeeds";
import "./feedPost.css";
import axios from "axios";

export default class FeedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: ""
    };
  }

  componentDidMount = async () => {
    try {
      if (!this.props.post.anonymity) {
        const {
          data: { username, email }
        } = await axios.get(
          `https://cluster-duck-server.herokuapp.com/api/users/${this.props.userId}`
        );

        this.setState({ username: username, email: email });
      }
    } catch (err) {}
  };

  displayLink = () => {
    if (this.props.post.anonymity) {
      return "Anonymous";
    } else
      return (
        <Link to={`/profile/${this.state.email}`}>
          {this.props.post.anonymity ? "Anonymous" : this.state.username}
        </Link>
      );
  };

  render() {
    return (
      <li className="feed-post">
        <Card className="postContainer">
          <div className="heading">
            <h1 className="title">{this.props.post.title}</h1>
            <div className="poster" style={{ marginBottom: "10px" }}>
              By {this.displayLink()}
            </div>
            <div className="timeStamp">
              <small>
                {"Posted " + moment(this.props.post.createdAt).fromNow()}
              </small>
            </div>
            <div className="topic">
              <Badge color="secondary">{this.props.post.csTopic}</Badge>
            </div>
          </div>
          <div className="postText">{this.props.post.text}</div>
          <div className="footing">
            <div className="rating">
              {"Rating: " +
                (this.props.post.upVotes.length -
                  this.props.post.downVotes.length)}
            </div>
            <div className="replies">
              {this.props.post.replies.length + " replies"}
            </div>
          </div>
        </Card>
      </li>
    );
  }
}
