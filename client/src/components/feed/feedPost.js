//layout of an individual post

import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
// import axios from 'axios';
import t from "./testfeeds";

const b = t.body;

export default function FeedPost() {
  /*
    call to api to get array of JSON with posts
  */
  return (
    <ListGroup>
      {b.map(p => {
        return (
          <ListGroupItem>
            <ListGroupItemHeading>{p.author + " says:"}</ListGroupItemHeading>
            <ListGroupItemText>{p.body}</ListGroupItemText>
          </ListGroupItem>
        )
      })}
    </ListGroup>
  );
}