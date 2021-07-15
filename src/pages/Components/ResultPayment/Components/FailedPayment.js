import { useDispatch } from "react-redux";
import { refillCart } from "../../../../redux/cart/cartActions";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "./resultPage.module.css";

function FailedPayment() {
  const products = JSON.parse(localStorage.getItem("customerDetails"))[0].products
  console.log(products)
  const dispatch = useDispatch();
  dispatch(refillCart(products));
  return (
    <div className={styles.message}>
      <CancelIcon style={{ color: "#CF2A27", fontSize: 100 }} />
      <p className={styles.margin}>
        پرداخت موقفیت آمیز نبود سفارش شما در انتظار پرداخت است.
      </p>
    </div>
  );
}

export { FailedPayment };
