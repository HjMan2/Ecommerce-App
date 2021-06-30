import React from "react";
import { Link } from "react-router-dom";
import { TabManager } from "./Components/TabManager";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  direction: "rtl",
});

const useStyles = makeStyles(() => ({
  bgColor: {
    backgroundColor: "#56ba94",
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  title: {
    fontSize: "1rem",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.125rem",
      display: "block",
    },
  },
  links: {
    color: "#fff",
    textDecoration: "none",
    "&:active,&:hover": {
      color: "inherit",
    },
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function AdminNavBar({ value, onValueChange }) {
  const classes = useStyles();
  return (
    <>
      <div className={`${classes.grow} ${classes.marginBottom}`}>
        <AppBar position="static" className={classes.bgColor}>
          <Toolbar>
            <div className={`${classes.grow} ${classes.spacing}`}>
              <Typography className={classes.title} variant="h6" noWrap>
                پنل مدیریت فروشگاه
              </Typography>
              <TabManager value={value} onTabChange={onValueChange} />
            </div>
            <div className={classes.grow} />
            <div className={classes.spacing}>
              <Link className={classes.links} to="/">
                بازگشت به سایت
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export { AdminNavBar };
