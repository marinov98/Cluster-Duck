//Layout of feed container!!!

import React, { Component } from "react";
import {
  Button,
  Jumbotron,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import FeedPost from "./feedPost";
import PostQuestion from "./PostQuestion";
import "./FeedContainer.css";

export default class FeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      tag: null,
      showDropdown: false,
      query: ""
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
    "All"
  ];

  toggle = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    let allPosts = this.props.posts;

    //NOT SCALABLE
    if (this.state.tag !== null && this.state.tag !== "All") {
      allPosts = allPosts.filter(p => p.csTopic === this.state.tag);
    }

    if (this.state.query !== "") {
      allPosts = allPosts.filter(
        p =>
          p.title
            .toLocaleLowerCase()
            .indexOf(this.state.query.toLocaleLowerCase()) !== -1
      );
    }

    return (
      <div className="feedContainer">
        <Jumbotron>
          <h1>
            Welcome! You can ask questions, post advice, and see other people's
            questions and advice below
          </h1>
        </Jumbotron>
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button style={{ margin: "10px" }} size="lg" onClick={this.toggle}>
            Make a Post
          </Button>
          <InputGroup style={{ width: "50%", margin: "10px" }}>
            <InputGroupAddon addonType="append">
              <InputGroupText>Search for Posts!</InputGroupText>
            </InputGroupAddon>
            <Input onChange={e => this.handleQueryChange(e)} />
          </InputGroup>
          <Dropdown
            isOpen={this.state.showDropdown}
            toggle={this.toggleDropdown}
          >
            <DropdownToggle caret>
              {this.state.tag === null ? "Filter By Tags" : this.state.tag}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Tags</DropdownItem>
              {this.allTags.map((tag, rank) => {
                return (
                  <DropdownItem
                    key={rank + 1}
                    onClick={() => this.setState({ tag })}
                  >
                    {tag}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Collapse isOpen={this.state.toggle}>
          <PostQuestion toggle={this.toggle} auth={this.props.auth} />;
        </Collapse>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className="posts"
        >
          {allPosts.map((p, rank) => (
            <FeedPost post={p} userId={p.userId} key={rank + 1} />
          ))}
        </ul>
      </div>
    );
  }
}
