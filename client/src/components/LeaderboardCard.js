import React from "react";
import { Container, Card, CardTitle, CardText } from "reactstrap";

export default function LeaderboardCard({ rank, user }) {
  return (
    <Container style={{ padding: "10px" }}>
      <Card body className="text-center">
        <CardTitle>
          <h2>{`${rank}: ${user.firstName} ${user.lastName}`}</h2>
        </CardTitle>
        <CardText>{`${user.username}`}</CardText>
      </Card>
    </Container>
  );
}
