import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/cart/cartActions";
import { getProduct } from "../../../services/ordersService";
import { transformToHtml } from "../../../utils/transformToHtml";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { TextField, Typography, Breadcrumbs } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  product: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: `${theme.spacing(2)}px 0`,
    gap: theme.spacing(10),
  },
  general: {
    display: "flex",
    gap: theme.spacing(5),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      " & > img": {
        flexGrow: "1"
      }
    },
    "& > img": {
      width: "300px",
      height: "300px",
      objectFit: "cover",
    },
  },
  detalis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addBtn: {
    backgroundColor: "#198754",
    color: "white",
    "&:hover": {
      backgroundColor: "#197054",
    },
  },
  fileds: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },
  bold: {
    fontSize: "1.875rem",
    fontWeight: "600",
    fontFamily: "inherit",
    color: "black",
  },
  bread: {
    fontFamily: "IRANSans",
  },
}));

function Product() {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const count =
    useSelector((state) =>
      state.products.filter((product) => product.id === +productId)
    )[0]?.numberOfDemand || 0;
  const [numberOfDemand, setNumberOfDemand] = useState(count);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct(productId).then((res) => setProduct(res));
  }, [productId]);

  const handleChange = (e) => {
    setNumberOfDemand(e.target.value);
  };

  const handleClick = () => {
    dispatch(addTocart(product, numberOfDemand));
  };

  return (
    <>
      <div className={classes.product}>
        <div className={classes.general}>
          <img src={product.image} alt={product.name} />
          <div className={classes.detalis}>
            <div className={classes.bold}>{product.name}</div>
            <div>
              <Breadcrumbs
                separator={<NavigateBeforeIcon fontSize="large" />}
                className={classes.bread}
              >
                <Typography className={classes.bold}>
                  {product.category}
                </Typography>
                {product.pathName &&
                  product.pathName.split(",").map((item) => (
                    <Typography key={item} className={classes.bold}>
                      {item}
                    </Typography>
                  ))}
              </Breadcrumbs>
            </div>
            <div className={classes.bold}>{product.price} تومان</div>
            <div className={classes.fileds}>
              {
                product.numberInStock > 0 ? (
                  <>
                    <TextField
                inputProps={{ min: 0, max: product.numberInStock }}
                id="outlined-number"
                type="number"
                value={numberOfDemand}
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                disabled={Boolean(!+numberOfDemand)}
                variant="contained"
                className={classes.addBtn}
                size="large"
                onClick={handleClick}
              >
                افزودن به سبد خرید
              </Button>
                  </>
                ): <h5>اتمام موجودی</h5>
              }
            </div>
          </div>
        </div>
        <div>{transformToHtml(product.description)}</div>
      </div>
    </>
  );
}

export { Product };
