import React, { Component } from "react";
import AddComment from "./AddComment";
import Reply from "./Reply";
import axios from "axios";
import { Container, Jumbotron, Media, Collapse, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.match.params.postid,
      post: { upVotes: [], downVotes: [] },
      replies: [],
      toggle: false,
      userId: "",
      email: ""
    };
  }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4004/api/posts/${this.state.postId}`
      );

      if (data !== null) this.setState({ post: data });
      else this.props.history.push("/");

      // fetch all replies
      const replies = await axios.get(
        `http://localhost:4004/api/replies/${this.state.postId}`
      );
      this.setState({ replies: replies.data });

      const userResponse = await axios.get(
        `http://localhost:4004/api/users/user/${this.props.auth.user.email}`
      );

      const authResponse = await axios.get(
        `http://localhost:4004/api/users/${this.state.post.userId}`
      );

      this.setState({
        userId: userResponse.data._id,
        email: authResponse.data.email
      });
    } catch (err) {
      console.error(err);
    }
  };

  displayEmail = () => {
    if (!this.state.post.anonymity)
      return (
        <h3>
          <Link to={`/profile/${this.state.email}`}>{this.state.email}</Link>
        </h3>
      );
    else return <h3>Anonymous</h3>;
  };

  toggle = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  handleLike = async () => {
    try {
      await axios.post(
        `/api/posts/${this.state.postId}/${this.state.userId}/like`
      );
      this.refreshWindow();
    } catch (err) {
      console.error(err);
    }
  };

  refreshWindow = () => {
    window.location.reload();
  };

  handleDislike = async () => {
    try {
      await axios.post(
        `http://localhost:4004/api/posts/${this.state.postId}/${this.state.userId}/dislike`
      );
      this.refreshWindow();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const points =
      this.state.post.upVotes.length - this.state.post.downVotes.length;

    const replies = this.state.replies.map((reply, rank) => (
      <Reply data={reply} key={rank + 1}></Reply>
    ));

    return (
      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <Container className="display-3">
          <Jumbotron>
            <h1>{this.state.post.title}</h1>
            <h5>{this.state.post.csTopic}</h5>
            {this.displayEmail()}
          </Jumbotron>
          <Button
            color="primary"
            style={{ margin: "10px" }}
            onClick={this.handleLike}
          >
            <span role="img" aria-label="THUMBS UP SIGN">
              👍
            </span>
          </Button>
          <Button color="danger" onClick={this.handleDislike}>
            <span role="img" aria-label="THUMBS DOWN SIGN">
              👎
            </span>
          </Button>
          <p style={{ fontSize: "20px" }}>
            {moment(this.state.post.createdAt).fromNow()}
          </p>
          <p style={{ fontSize: "20px" }}>{`${points} points`}</p>
          <Media middle body>
            <p style={{ fontSize: "35px" }}>{this.state.post.text}</p>
          </Media>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button style={{ margin: "10px" }} size="lg" onClick={this.toggle}>
              Reply to this post
            </Button>
          </div>
          <Collapse isOpen={this.state.toggle}>
            <AddComment
              toggle={this.toggle}
              userEmail={this.props.auth.user.email}
              postId={this.state.postId}
            />
          </Collapse>
          <div className="replies">
            <ul className="list" style={{ listStyleType: "none" }}>
              {replies}
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}

export default Post;
