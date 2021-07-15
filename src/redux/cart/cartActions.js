import {
  ADD_TO_CART,
  REFILL_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  SET_TOTAL_PRICE,
} from "./cartTypes";

const addTocart = (product, diff) => {
  return {
    type: ADD_TO_CART,
    payload: {
      ...product,
      numberOfDemand: 0,
      diff,
    },
  };
};

const deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    payload: {
      id,
    },
  };
};

const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

const refillCart = (products) => {
  return {
    type: REFILL_CART,
    payload: {
      products: [...products],
    },
  };
};


const setTotalPrice = (totalPrice) => {
  return {
    type: SET_TOTAL_PRICE,
    payload: {
      totalPrice,
    },
  };
};

export {
  addTocart,
  deleteFromCart,
  clearCart,
  refillCart,
  setTotalPrice,
};
