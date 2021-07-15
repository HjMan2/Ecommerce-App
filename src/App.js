import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import AppRoute from "./route/App.route";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRoute />
    </Provider>
  );
}

export default App;
