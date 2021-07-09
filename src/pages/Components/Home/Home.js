import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../../../services/ordersService";
import { AdminSpecialProducts } from "./Components/AdminSpecialproducts";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "1",
    margin: `${theme.spacing(2)}px 0`,
  },
}));

function Home() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res));
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <AdminSpecialProducts categories={categories} products={products}/>
      </Grid>
    </div>
  );
}

export { Home };
