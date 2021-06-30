import { Link, useHistory } from "react-router-dom";
import {
  makeStyles,
  Button,
  Paper,
  TextField,
  createMuiTheme,
} from "@material-ui/core";
const theme = createMuiTheme({
  direction: "rtl",
});

const useStyles = makeStyles(() => ({
  root: {
    direction: theme.direction,
    width: "100%",
    height: "100vh",
    overflow: "hiddin",
    padding: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.up("lg")]: {
      width: "50%",
      margin: "0 auto",
    },
  },
  login: {
    width: "100%",
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > div": {
      marginBottom: theme.spacing(3),
    },
  },
  rightLabel: {
    "& > label": {
      left: "auto",
    },
  },
  backToMain: {
    display: "inline-block",
    textDecoration: "none",
    border: "1px solid darkCyan",
    padding: "5px",
    borderRadius: "3px",
    fontWeight: "400",
    backgroundColor: "#fff",
    color: "black",
    transition: "all 300ms ease-in-out",
    "&:active": {
      color: "inherit",
    },
    "&:hover": {
      color: "darkGray",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace("/admin-dashboard");
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} square className={classes.login}>
        <h4>ورود به پنل فروشگاه اینترنتی</h4>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="نام کاربری"
            className={classes.rightLabel}
          />
          <TextField
            name="password"
            label="رمز عبور"
            className={classes.rightLabel}
          />
          <Button variant="contained" color="primary" type="submit">
            ورود
          </Button>
          <div className="d-flex mb-0 mt-2 justify-content-end text-">
            <Link to="/" className={classes.backToMain}>
              بازگشت به سایت
            </Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export { Login };
