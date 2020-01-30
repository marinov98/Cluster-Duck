import React, { Component } from "react";
import AddComment from "./AddComment";
import Reply from "./Reply";
import axios from "axios";
import { Container, Jumbotron, Media, Collapse, Button } from "reactstrap";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.match.params.postid,
      post: { upVotes: [], downVotes: [] },
      replies: [],
      toggle: false,
      userId: ""
    };
  }

  componentDidMount = async () => {
    const postUrl = `https://cluster-duck-server.herokuapp.com/api/posts/${this.state.postId}`;
    try {
      const { data } = await axios.get(postUrl);

      if (data !== null) this.setState({ post: data });
      else this.props.history.push("/");

      // fetch all replies
      const replies = await axios.get(
        `https://cluster-duck-server.herokuapp.com/api/replies/${this.state.postId}`
      );
      this.setState({ replies: replies.data });

      if (!this.props.auth.user.id) {
        const userResponse = await axios.get(
          `https://cluster-duck-server.herokuapp.com/api/users/user/${this.props.auth.user.email}`
        );
        this.setState({ userId: userResponse.data._id });
      }
    } catch (err) {
      console.error(err);
    }
  };

  toggle = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  handleLike = async () => {
    try {
      await axios.post(
        `https://cluster-duck-server.herokuapp.com/api/posts/${this.state.postId}/${this.state.userId}/like`
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
        `https://cluster-duck-server.herokuapp.com/api/posts/${this.state.postId}/${this.state.userId}/dislike`
      );
      this.refreshWindow();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const dateString = new Date(this.state.post.createdAt).toLocaleString();
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
          <p style={{ fontSize: "20px" }}>{dateString}</p>
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
          <ul className="replies" style={{ listStyleType: "none" }}>
            {replies}
          </ul>
        </Container>
      </div>
    );
  }
}

export default Post;
