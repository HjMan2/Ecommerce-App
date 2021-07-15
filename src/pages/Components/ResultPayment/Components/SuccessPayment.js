import {
  saveToPendingList,
  setCountInStock,
} from "../../../../services/ordersService";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styles from "./resultPage.module.css";
import { useEffect } from "react";
function SuccessPayment() {
  const componentDidMount = () => {
    const customer = JSON.parse(localStorage.getItem("customerDetails"))[0];
    saveToPendingList(customer);
    const stockList = customer.products.map((item) => ({
      id: item.id,
      numberInStock: item.numberInStock,
      numberOfDemand: item.numberOfDemand,
    }));
    setCountInStock(stockList);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div className={styles.message}>
      <CheckCircleIcon style={{ color: "#009E0F", fontSize: 100 }} />

      <p className={styles.margin}>
        با تشکر از پرداخت شما سفارش شما ثبت شد و جهت هماهنگی ارسال با شما تماس
        گرفته خواهد شد.
      </p>
    </div>
  );
}

export { SuccessPayment };
