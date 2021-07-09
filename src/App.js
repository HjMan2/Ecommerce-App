import AppRoute from "./route/App.route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <AppRoute />
    </>
  );
}

export default App;
