import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getAllProducts, getCategories } from "../../../services/ordersService";
import { ProductsList } from "../../../common/Components/ProductsList";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paginate } from "../../../common/Components/Paginate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "2",
    margin: `${theme.spacing(2)}px 0`,
  },
  parent: {
    display: "flex",
  },
  list: {
    flexGrow: "1",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    "& > ul": {
      padding: 0,
    },
  },
}));

function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page") || 1;
  const status = new URLSearchParams(search).get("status");
  const { activeTab } = useParams();
  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response);
    });
    getCategories().then((res) => setCategories(res));
  }, []);

  const categoryList = () => {
    if (status) {
      const list = products.filter(
        (item) => item.pathName.split(",")[1] === status
      );
      return list;
    }
    const list = products.filter(
      (item) => item.pathName.split(",")[0] === activeTab
    );
    return list;
  };

  const slicedData = () => {
    const list = categoryList().slice(pageNumber * 10 - 10, pageNumber * 10);
    return list;
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={2}>
            <Paper className={classes.paper}>
              <ul>
                {categories.map((cat, index) => (
                  <li key={index}>
                    <strong>{cat.name}</strong>
                    <ul>
                      {cat.subCats.map((subCat, index) => (
                        <Fragment key={index}>
                          <li>
                            <Link to={`/search/${subCat.subName}`}>
                              {subCat.subName}
                            </Link>
                          </li>
                          <ul>
                            {subCat.children.map((child) => (
                              <li key={child}>
                                <Link
                                  to={`/search/${subCat.subName}?status=${child}`}
                                >
                                  {child}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Fragment>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item lg={10} xs={12} container spacing={3}>
            <ProductsList list={slicedData()} />
          </Grid>
        </Grid>
      </div>
      <Paginate count={Math.ceil(categoryList().length / 10)} path="search" />
    </>
  );
}

export { Products };
