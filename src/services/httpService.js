import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use((response) => {
  // console.log("SHOW LOADING...");
  return response;
}, null);

axios.interceptors.response.use(
  (config) => {
    // console.log("HIDE LOADING...");
    return config;
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      toast.error("an unexpected error occurred!");
      console.log("Error message: ", error);
    }
    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch
};

export default http;
