import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
  },
  img: {
    width: "100px",
    height: "100px",
    border: "1px solid darkgray",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    marginLeft: theme.spacing(2),
    alignItems: "center",
    "& > img": {
      width: "80px",
      height: "80px",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "right",
  },
}));

function ProductCard({ item }) {
  const classes = useStyles();
  return (
    <Link to={`/product/${item.id}`}>
      <Paper className={classes.paper}>
        <div className={classes.img}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={classes.details}>
          <span>{item.name}</span>
          <span>{item.price} تومان</span>
        </div>
      </Paper>
    </Link>
  );
}

export { ProductCard };
