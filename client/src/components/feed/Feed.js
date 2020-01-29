import React, { useEffect, useState } from "react";
import FeedContainer from "../feed/FeedContainer";
import axios from "axios";
import { Spinner } from "reactstrap";

const Feed = ({ auth }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          "https://cluster-duck-server.herokuapp.com/api/posts/"
        );
        setPosts(data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Try again later.");
      }
    };
    fetchPosts();
  }, []);

  return posts.length === 0 ? (
    <div style={{ textAlign: "center" }}>
      <Spinner
        type="grow"
        style={{ marginTop: "50px", width: "15rem", height: "15rem" }}
        color="primary"
      />
    </div>
  ) : (
    <FeedContainer posts={posts} auth={auth} />
  );
};

export default Feed;
