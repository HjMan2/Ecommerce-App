import CssBaseline from '@material-ui/core/CssBaseline';
import {Typography} from "@material-ui/core";
import Container from '@material-ui/core/Container';

function Content({ children }) {

  return (
      <>
          <CssBaseline />
          <Container maxWidth="sm">
              <Typography component="div">
                  {children}
              </Typography>
          </Container>
      </>
  );
}

export { Content }