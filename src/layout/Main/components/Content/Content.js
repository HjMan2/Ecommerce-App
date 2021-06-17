import { Container, Col } from "react-bootstrap";

function Content({ children }) {
  return (
    <Container>
      <Col>{children}</Col>
    </Container>
  );
}

export { Content }