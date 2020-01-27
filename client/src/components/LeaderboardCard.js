import React from "react";
import { Container, Card, CardTitle, CardText } from "reactstrap";

export default function LeaderboardCard(props) {
  return (
    <Container style={{ padding: "10px" }}>
      <Card body className="text-center">
        <CardTitle>
          <h2>{`${props.rank}: ${props.user.firstName} ${props.user.lastName}`}</h2>
        </CardTitle>
        <CardText>{`${props.user.username}`}</CardText>
      </Card>
    </Container>
  );
}
