import React, { Component } from "react";
import {
	Container,
	Form,
	FormText,
	InputGroup,
  InputGroupAddon,
	Input,
	ListGroup,
	ListGroupItem,
	Button
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

export default class UserChat extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = async event => {
	};

	render() {
		return (
			<Container>
				<h6 className="display-3">Chat</h6>
				<ListGroup>
					{/* <ListGroupItem></ListGroupItem> */}
				</ListGroup>
				<Form className="form" action="" onSubmit={this.handleSubmit}>
					<InputGroup>
						<Input id="m" autocomplete="off" />
						<InputGroupAddon addonType="append"><Button>Send</Button></InputGroupAddon>
					</InputGroup>
				</Form>
			</Container>
		);
	}
};
