//Layout of feed container!!!

import React, { Component } from "react";
import { Button, Jumbotron, Collapse, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from "reactstrap";
import FeedPost from "./feedPost";
import PostQuestion from "./PostQuestion";
import "./FeedContainer.css";

export default class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      tag: null,
      showDropdown: false
    };
  }

  allTags = [
    "CSCI-127",
    "CSCI-135",
    "CSCI-136",
    "CSCI-150",
    "CSCI-235",
    "CSCI-160",
    "CSCI-335",
    "CSCI-260",
    "CSCI-265",
    "CSCI-340",
    "CSCI-Electives",
    "General",
    "All"];

  toggle = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  toggleDropdown = () => {
    this.setState({showDropdown: !this.state.showDropdown});
  };



  render() {
    
    let allPosts; 
    if (this.state.tag === null || this.state.tag === 'All')  {
      allPosts = this.props.posts
        .map((p, rank) => <FeedPost post={p} userId={p.userId} key={rank + 1} />);
    } else {
      allPosts = this.props.posts
        .filter(p => p.csTopic === this.state.tag)
        .map((p, rank) => <FeedPost post={p} userId={p.userId} key={rank + 1} />);
    }
    return (
      <div className="feedContainer">
        <Jumbotron>
          <h1>
            Welcome! You can ask questions, post advice, and see other people's
            questions and advice below
          </h1>
        </Jumbotron>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button style={{ margin: "10px" }} size="lg" onClick={this.toggle}>
            Post a question
          </Button>
          <Dropdown isOpen={this.state.showDropdown} toggle={this.toggleDropdown}>
            <DropdownToggle caret>{this.state.tag === null ? "Filter By Tags" : this.state.tag}</DropdownToggle>
            <DropdownMenu>
            <DropdownItem header>Tags</DropdownItem>
              {this.allTags.map(tag => {
                return (<DropdownItem onClick={() => this.setState({tag: tag})}>{tag}</DropdownItem>);
              })}
            </DropdownMenu>
          </Dropdown>

        </div>
        <Collapse isOpen={this.state.toggle}>
          <PostQuestion toggle={this.toggle} auth={this.props.auth} />;
        </Collapse>
        <ul style={{ listStyleType: "none" }} className="posts">
          {allPosts}
        </ul>
      </div>
    );
  }
}
