import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Jumbotron,
  Media,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.match.params.postid,
      post: { upVotes: [], downVotes: [] },
      replies: []
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
    } catch (err) {
      console.error(err);
    }
  };

  displayReplies = () => {
    const replies = this.state.post.replies.map(reply => (
      <ListGroupItem>{reply.text}</ListGroupItem>
    ));
    return <ListGroup>{replies}</ListGroup>;
  };

  render() {
    console.log(this.state.post);

    const dateString = new Date(this.state.post.createdAt).toLocaleString();
    const points =
      this.state.post.upVotes.length - this.state.post.downVotes.length;

    return (
      <div style={{ textAlign: "center", paddingTop: "40px" }}>
        <Container className="display-3">
          <Jumbotron>
            <h1>{this.state.post.title}</h1>
            <h5>{this.state.post.csTopic}</h5>
          </Jumbotron>
          <p style={{ fontSize: "20px" }}>{dateString}</p>
          <p style={{ fontSize: "20px" }}>{`${points} points`}</p>
          <Media middle body>
            <p style={{ fontSize: "35px" }}>{this.state.post.text}</p>
          </Media>
        </Container>
      </div>
    );
  }
}

export default Post;
