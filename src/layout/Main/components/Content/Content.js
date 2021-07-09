import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function Content({ children }) {
  return (
    <>
      <CssBaseline />
      <Container style={{minHeight: "700px"}}>{children}</Container>
    </>
  );
}

export { Content };
