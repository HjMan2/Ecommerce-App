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

async function updateNumberInStock(items) {
  try {
    items.forEach((item) => {
      http.put(createUrl("allProducts", item.id), item);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteProduct(id) {
  return await http.delete(createUrl("allProducts", id));
}

async function getCategories() {
  try {
    const { data } = await http.get(createUrl("categories"));
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function editProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("image", product.image);
  formData.append("numberInStock", product.numberInStock);
  formData.append("category", product.category[0]);
  formData.append("description", product.description);
  formData.append("pathName", product.category.slice(1));
  console.log(product.category);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    if (product.id) {
      const id = product.id;
      delete product.id;
      return await http.patch(createUrl("allProducts", id), formData, config);
    } else {
      return await http.post(createUrl("allProducts"), formData, config);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllProducts() {
  try {
    const { data } = await http.get(createUrl("allProducts"));
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getProduct(id) {
  try {
    const { data } = await http.get(createUrl("allProducts", id));
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getPagedProducts(pageNumber) {
  try {
    const response = await http.get(createUrl("allProducts"), {
      params: {
        _page: pageNumber,
        _limit: 10,
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

async function saveToDeliveredOrders(id, status) {
  try {
    await http.patch(createUrl("orders", id), status);
  } catch (error) {
    console.log(error.message);
  }
}

async function saveToPendingList(customer) {
  try {
    await http.post(createUrl("orders"), customer);
  } catch (error) {
    console.log(error.message);
  }
}

async function setCountInStock(stockList) {
  console.log(stockList)
  try {
    stockList.forEach(async(item) => {
      await http.patch(createUrl("allProducts", item.id), {
        numberInStock: item.numberInStock - item.numberOfDemand,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

export {
  saveToDeliveredList,
  getOrders,
  getNumberInStock,
  updateNumberInStock,
  deleteProduct,
  getCategories,
  editProduct,
  getAllProducts,
  getProduct,
  getPagedProducts,
  saveToDeliveredOrders,
  saveToPendingList,
  setCountInStock,
};
