import http from "./httpService";
import { apiEndPoint } from "../config/config.json";

const createUrl = (demand, id = "") => `${apiEndPoint}/${demand}/${id}`;

async function getOrders(status, pageNumber) {
  try {
    const response = await http.get(createUrl("orders"), {
      params: {
        status,
        _page: pageNumber,
        _limit: 5,
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

async function saveToDeliveredList(id) {
  try {
    const { data } = http.put(createUrl(id));
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getNumberInStock(pageNumber) {
  try {
    const response = await http.get(createUrl("allProducts"), {
      params: {
        _page: pageNumber,
        _limit: 5,
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export { saveToDeliveredList, getOrders, getNumberInStock };
