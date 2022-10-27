import {
  SET_USER_PRODUCTS,
  UPDATE_PRODUCT,
  SET_ALL_PRODUCTS,
} from '../actions/product';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  allProducts: [],
  userStoreProduct: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PRODUCTS:
      return {
        ...state,
        userStoreProduct: action.storeProducts,
      };
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.allStoreProduct,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
