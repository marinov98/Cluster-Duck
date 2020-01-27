//Layout of feed container!!!

import React from 'react';
// import { Button } from 'reactstrap';
import FeedPost from './feedPost';
// import axios from 'axios'
import './FeedContainer.css';

// const POST_URL = "https://cluster-duck-server.herokuapp.com/api/posts";


export default function FeedContainer(props) {
  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const { data } = await axios.get(POST_URL);

  //     } catch (err){
  //       console.error(err);
  //     }
  //   }
  // })
  
  // const refreshFeed = () => {

  // }

  return (
    <div className="feedContainer">
      {/* { list of shits from user state} */}
      <div className="header">
        Your Posts
      </div>
      <div className="posts">  
        {
          props.posts.map(p => {
            return (<FeedPost post={p} />);
          })
        }
      </div>
    </div>
  );
}