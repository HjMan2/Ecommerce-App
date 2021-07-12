import { useLocation, Link } from "react-router-dom";
import { TableData } from "../../../../../../../common/Components/Table";
import { Button, makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  parent: {
    "& > div": {
      display: "flex",
      gap: theme.spacing(2),
      "& span:first-child": {
        width: "100px",
      },
    },
  },
  deliver: {
    display: "flex",
    justifyContent: "center",
    AlignSelf: "center",
    gap: theme.spacing(2),
    "& > button": {
      backgroundColor: "#198754",
      color: "white",
      "&:hover": {
        backgroundColor: "#197054",
      },
    },
  },
}));

function OrderDetails({ customer, onClose, open, saveToDelivered }) {
  const classes = useStyles();
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
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
  ];

  const formatDate = (date) => {
    return new Date(+date).toLocaleDateString("fa-IR");
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.parent}>
        <div>
          <span>نام مشتری:</span>
          <span>{customer.name}</span>
        </div>
        <div>
          <span>آدرس:</span>
          <span>{customer.address}</span>
        </div>
        <div>
          <span>تلفن:</span>
          <span>{customer.phone}</span>
        </div>
        <div>
          <span>زمان‌ تحویل:</span>
          <span>{formatDate(customer.deliverTime)}</span>
        </div>
        <div>
          <span>زمان‌ سفارش:</span>
          <span>{formatDate(customer.timeStamp)}</span>
        </div>
      </div>
      <div className={classes.table}>
        <TableData
          columns={columns}
          data={customer.products}
          maxHeight={true}
        />
      </div>
      <div className={classes.deliver}>
        {status === "pending" ? (
          <Button variant="contained" className={classes.btn} onClick={() => saveToDelivered(customer)}>
            تحویل شد
          </Button>
        ) : (
          <>
            <span>زمان‌ تحویل:</span>
            <span>{formatDate(customer.deliverTime)}</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export { OrderDetails };
