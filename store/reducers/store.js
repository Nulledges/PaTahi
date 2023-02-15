import {
  SET_USER_STORE,
  SET_APPROVED_STORE,
  SET_APPROVED_CART_STORE,
  SET_SPECIFIC_STORE,
} from '../actions/store';
import {EMPTY_CART} from '../actions/cart';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  myStore: null,
  approvedStores: [],
  approvedCartStores: [],
  approvedSpecificStores: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STORE:
      return {
        ...state,
        myStore: action.myStoreInfo,
      };
    case SET_APPROVED_STORE:
      return {
        ...state,
        approvedStores: action.approvedStoreInfo,
      };
    case SET_APPROVED_CART_STORE:
      return {...state, approvedCartStores: action.cartApprovedStoreInfo};
    case SET_SPECIFIC_STORE:
      return {...state, approvedSpecificStores: action.specificStore};
    case EMPTY_CART: {
      return {...state, approvedCartStores: []};
    }
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
