import {
  ADD_TO_CART,
  REFILL_CART,
  DELETE_FROM_CART,
  SET_TOTAL_PRICE,
} from "./cartTypes";

const initialState = {
  totalPrice: 0,
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index > -1) {
        const product = {
          ...state.products[index],
          numberOfDemand: Number(action.payload.diff),
        };
        const newProducts = [...state.products];
        newProducts[index] = product;
        return {
          ...state,
          products: newProducts,
        };
      }
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            category: action.payload.category,
            description: action.payload.description,
            pathName: action.payload.pathName,
            numberInStock: action.payload.numberInStock,
            numberOfDemand: Number(action.payload.diff),
          },
        ],
      };
    }
    case DELETE_FROM_CART: {
      const id = action.payload.id;
      const newProducts = state.products.filter((product) => product.id !== id);
      return {
        ...state,
        products: [...newProducts],
      };
    }
    case REFILL_CART: {
      return {
        ...state,
        products: [...action.payload.products],
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };
    }
    default:
      return state;
  }
};

export { cartReducer };
