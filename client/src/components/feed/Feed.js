import React, { useEffect, useState } from 'react';
import FeedContainer from '../feed/FeedContainer';
import axios from 'axios';
import { Spinner } from 'reactstrap';

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("https://cluster-duck-server.herokuapp.com/api/posts/");
         setPosts(data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Try again later.");
      }
    }
    fetchPosts();
  },[]);

  return (
    posts.length === 0 ?
    (
      <Spinner type="grow" color="primary" />
    ) :
    (
      <FeedContainer posts={posts.sort((a,b) => {
        return (new Date(b.createdAt)) - (new Date(a.createdAt));
      })} />
    )
  );
}

export default Feed;