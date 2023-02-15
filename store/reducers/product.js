import {
  SET_USER_PRODUCTS,
  SET_STORE_PRODUCTS,
  SET_ALL_PRODUCTS,
  SET_CART_PRODUCTS,
  SET_SPECIFIC_PRODUCT,
} from '../actions/product';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  allProducts: [],
  userStoreProducts: [],
  storeProducts: [],
  cartProducts: [],
  specificProduct: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PRODUCTS:
      return {
        ...state,
        userStoreProducts: action.userStoreProducts,
      };
    case SET_STORE_PRODUCTS:
      return {
        ...state,
        storeProducts: action.storeProducts,
      };

    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.allStoreProduct,
      };

    case SET_SPECIFIC_PRODUCT:
      return {...state, specificProduct: action.specificProduct};
    case SET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: action.cartProducts,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
