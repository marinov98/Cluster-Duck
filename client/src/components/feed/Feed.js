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
    <Spinner type="grow" color="primary" />
  ) : (
    <FeedContainer posts={posts} auth={auth} />
  );
};

export default Feed;
