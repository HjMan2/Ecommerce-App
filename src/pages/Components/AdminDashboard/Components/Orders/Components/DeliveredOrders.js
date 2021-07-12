import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getOrders } from "../../../../../../services/ordersService";
import { TableData } from "../../../../../../common/Components/Table";
import { Paginate } from "../../../../../../common/Components/Paginate";
import Button from "@material-ui/core/Button";
import { OrderDetails } from "./Components/OrdersDetails";

function DeliveredOrders({ onClose, onOpen, open, customer }) {
  const [result, setResult] = useState([]);
  const [responseLength, setResponseLength] = useState(5);
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page");

  useEffect(() => {
    getOrders("delivered", pageNumber).then((response) => {
      setResult(response.data);
      setResponseLength(+response.headers["x-total-count"]);
    });
  }, [pageNumber]);
  const columns = [
    {
      path: "name",
      label: "نام",
    },
    {
      path: "totalPrice",
      label: "مجموع مبلغ",
    },
    {
      path: "timeStamp",
      label: "زمان‌ ثبت سفارش",
    },
    {
      details: (person) => (
        <Button variant="contained" onClick={() => onOpen(person)}>
          بررسی‌سفارش
        </Button>
      ),
      key: "details",
      label: "جزئیات",
    },
  ];
  return (
    <>
      <TableData columns={columns} data={result} />
      <Paginate count={Math.ceil(responseLength / 5)} path="admin-dashboard" />
      <OrderDetails customer={customer} onClose={onClose} open={open} />
    </>
  );
}

export { DeliveredOrders };
