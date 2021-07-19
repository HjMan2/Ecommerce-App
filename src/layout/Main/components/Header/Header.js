import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { ShoppingCart } from "@material-ui/icons";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  direction: "rtl",
});
const useStyles = makeStyles(() => ({
  bgColor: {
    backgroundColor: "#c2a22f",
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
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.125rem",
    },
  },
  links: {
    color: "#fff",
    textDecoration: "none",
    fontFamily: "IRANSans",
    "&:active,&:hover": {
      color: "inherit",
    },
  },
  spacing: {
    display: "flex",
    justifyContent: "space-between",
    width: "100px",
    alignItems: "center",
  },
}));

function Header() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const formattedPath = path.slice(1);
  const numberOfProducts = useSelector((state) => state.products.length);

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          {formattedPath.slice(0, formattedPath.indexOf("/")) === "goods" ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.links} style={{fontWeight: "700"}}>
              فروشگاه اینترنتی
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.spacing}>
            <Link className={classes.links} to="/login" style={{fontWeight: "600"}}>
              مدیریت
            </Link>
            <Link className={classes.links} to="/cart">
              <IconButton edge="start" color="inherit" aria-label="open drawer">
                {numberOfProducts ? (
                  <Badge color="error" badgeContent={numberOfProducts}>
                    <ShoppingCart />
                  </Badge>
                ) : (
                  <ShoppingCart />
                )}
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { Header };
