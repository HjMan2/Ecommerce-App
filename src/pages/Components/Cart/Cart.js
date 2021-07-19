import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { TableData } from "../../../common/Components/Table";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deleteFromCart, setTotalPrice } from "../../../redux/cart/cartActions";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  parent: {
    margin: `${theme.spacing(2)}px 0`,
    display: "flex",
    flexDirection: "column",
  },
  cta: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#198754",
    color: "white",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#197054",
    },
  },
}));

function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);
  const handleClick = () => {
    history.push("/shipping");
  };
  
  const sendAction = () => {
    dispatch(setTotalPrice(totalPrice()));
  };
  
  useEffect(() => {
    sendAction();
    return () => sendAction();
  }, []);
  
  const handleDelete = (product) => {
    dispatch(deleteFromCart(product.id));
  };
  
  const columns = [
    {
      details: (item) => <Link to={`/product/${item.id}`}>{item.name}</Link>,
      key: "name",
      label: "کالا",
    },
    {
      path: "price",
      label: "قیمت",
    },
    {
      path: "numberOfDemand",
      label: "تعداد",
    },
    {
      details: (item) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(item)}
            >
            حذف
          </Button>
        </>
      ),
      key: "edit",
      label: "تغییرات",
    },
  ];
  
  const totalPrice = () => {
    const allProcutPrice = data.map((item) => item.price * item.numberOfDemand);
    const totalPrice = allProcutPrice.reduce(
      (accm, current) => accm + current,
      0
      );
      return totalPrice;
    };

    return (
      <div className={classes.parent}>
      {data.length > 0 ? (
        <>
          <h4>سبد خرید</h4>
          <TableData columns={columns} data={data} />
          <div className={classes.cta}>
            <h5>جمع کل :‌ {totalPrice()} تومان</h5>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={handleClick}
            >
              نهایی کردن سبد خرید
            </Button>
          </div>
        </>
      ) : (
        <h4>سبد خرید خالی میباشد.</h4>
      )}
    </div>
  );
}

export { Cart };
