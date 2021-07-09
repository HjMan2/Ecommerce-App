import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "../../../services/ordersService";
import { transformToHtml } from "../../../utils/transformToHtml";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
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
  description: {},
  addBtn: {
    backgroundColor: "#198754",
    color: "white",
  },
  fileds: {
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
  },
  bold: {
    fontSize: "1.875rem",
    fontWeight: "600",
  },
}));

function Product() {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct(productId).then((res) => setProduct(res));
  }, [productId]);

  return (
    <>
      <div className={classes.product}>
        <div className={classes.general}>
          <img src={product.image} alt={product.name} />
          <div className={classes.detalis}>
            <div className={classes.bold}>{product.name}</div>
            <div>
              <Breadcrumbs separator={<NavigateBeforeIcon fontSize="large" />}>
                <Typography className={classes.bold}>{product.category}</Typography>
                {product.pathName && product.pathName.split(",").map((item) => (
                  <Typography key={item} className={classes.bold}>{item}</Typography>
                ))}
              </Breadcrumbs>
            </div>
            <div className={classes.bold}>{product.price} تومان</div>
            <div className={classes.fileds}>
              <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <Button variant="contained" className={classes.addBtn} size="lg">
                افزودن به سبد خرید
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.description}>
          {transformToHtml(product.description)}
        </div>
      </div>
    </>
  );
}

export { Product };
