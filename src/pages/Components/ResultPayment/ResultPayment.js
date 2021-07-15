import { useLocation } from "react-router";
import { SuccessPayment } from "./Components/SuccessPayment";
import { FailedPayment } from "./Components/FailedPayment";

function ResultPayment() {
  const search = useLocation().search;
  const resultPayment = JSON.parse(new URLSearchParams(search).get("success"));
  return <div>{resultPayment ? <SuccessPayment /> : <FailedPayment />}</div>;
}

export { ResultPayment };
