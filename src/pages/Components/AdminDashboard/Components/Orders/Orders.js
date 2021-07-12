import { useState, useEffect } from "react";
import { DeliveredOrders } from "./Components/DeliveredOrders";
import { PendingOrders } from "./Components/PendingOrders";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  radio: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "0.875rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
  grow: {
    flexGrow: "1",
    alignSelf: "center",
    fontSize: "1rem",
    [theme.breakpoints.up("lg")]: {
      justifySelf: "flex-start",
      fontSize: "1.875rem",
    },
  },
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Orders() {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();
  const { pathname } = useLocation();
  const [customer, setCustomer] = useState({});
  const [open, setOpen] = useState(false);
  const status = new URLSearchParams(search).get("status");
  const DEFAULT_STATUS = status || "pending";
  const [deliverStatus, setdeliverStatus] = useState(DEFAULT_STATUS);
  useEffect(() => {
    if (!status) {
      history.push(`${pathname}?status=${DEFAULT_STATUS}`);
    }
  }, [pathname, status, DEFAULT_STATUS, history]);

  const handleStatusChange = ({ target }) => {
    history.push(`${pathname}?status=${target.value}`);
    setdeliverStatus(target.value);
  };

  const handleOpen = (customer) => {
    setCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.radio}>
        <h2 className={classes.grow}>مدیریت سفارش‌ها</h2>
        <div>
          <span>سفارش های تحویل شده</span>
          <GreenRadio
            checked={deliverStatus === "delivered"}
            onChange={handleStatusChange}
            value="delivered"
            name="deliverStatus"
          />
        </div>
        <div>
          <span>سفارش های در انتظار تحویل</span>
          <GreenRadio
            checked={deliverStatus === "pending"}
            onChange={handleStatusChange}
            value="pending"
            name="deliverStatus"
          />
        </div>
      </div>
      {deliverStatus === "pending" ? (
        <PendingOrders
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          customer={customer}
        />
      ) : (
        <DeliveredOrders
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          customer={customer}
        />
      )}
    </>
  );
}

export { Orders };
