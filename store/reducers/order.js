import {
  SET_ONGOING_ORDERS,
  SET_FINISHED_ORDERS,
  SET_COLLECTED_ORDERS,
  SET_REFUNDED_ORDERS,
  SET_STOREONGOING_ORDERS,
  SET_STOREFINISHED_ORDERS,
  SET_STORECOLLECTED_ORDERS,
  SET_STOREREFUNDED_ORDERS,
} from '../actions/order';

import {LOGOUT} from '../actions/authentication';

const initialState = {
  ongoingItems: [],
  finishedItems: [],
  collectedItems: [],
  refundedItems: [],
  orderedItems: [],
  storeOngoingItems: [],
  storeFinishedItems: [],
  storeCollectedItems: [],
  storeRefundedItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ONGOING_ORDERS:
      return {
        ...state,
        ongoingItems: action.onGoingOrderInfo,
      };
    case SET_FINISHED_ORDERS:
      return {
        ...state,
        finishedItems: action.finishedOrderInfo,
      };
    case SET_COLLECTED_ORDERS:
      return {
        ...state,
        collectedItems: action.collectedOrderInfo,
      };
    case SET_REFUNDED_ORDERS:
      return {
        ...state,
        refundedItems: action.refundedOrderInfo,
      };
    case SET_STOREONGOING_ORDERS:
      return {
        ...state,
        storeOngoingItems: action.storeOngoingOrderInfo,
      };
    case SET_STOREFINISHED_ORDERS:
      return {
        ...state,
        storeFinishedItems: action.storeFinishedOrderInfo,
      };
    case SET_STORECOLLECTED_ORDERS:
      return {
        ...state,
        storeCollectedItems: action.storeCollectedOrderInfo,
      };
    case SET_STOREREFUNDED_ORDERS:
      return {
        ...state,
        storeRefundedItems: action.storeRefundedOrderInfo,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
