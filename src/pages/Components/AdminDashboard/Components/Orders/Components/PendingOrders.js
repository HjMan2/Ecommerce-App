import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getOrders, saveToDeliveredOrders } from "../../../../../../services/ordersService";
import { TableData } from "../../../../../../common/Components/Table";
import { Paginate } from "../../../../../../common/Components/Paginate";
import Button from "@material-ui/core/Button";
import { OrderDetails } from "./Components/OrdersDetails";
function PendingOrders({ onOpen, onClose, open, customer }) {
  const [result, setResult] = useState([]);
  const [responseLength, setResponseLength] = useState(5);
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page");

  useEffect(() => {
    getOrders("pending", pageNumber).then((response) => {
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

  const saveToDelivered = (item) => {
    const id = item.id
    const status = { status: "delivered"}
    saveToDeliveredOrders(id, status)
    const newResult = result.filter(customer => customer.id !== id)
    setResult(newResult)
    onClose()
  }

  return (
    <>
      <TableData columns={columns} data={result} />
      <Paginate count={Math.ceil(responseLength / 5)} path="admin-dashboard" />
      <OrderDetails
        customer={customer}
        onClose={onClose}
        open={open}
        saveToDelivered={saveToDelivered}
      />
    </>
  );
}

export { PendingOrders };
