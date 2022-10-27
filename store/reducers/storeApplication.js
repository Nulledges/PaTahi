import {
  SET_STORE_APPLICATION,
  SET_PENDING_APPLICATION,
  SET_USER_APPLICATION,
  SET_USERBYADMIN_APPLICATION,
  SET_APPROVED_APPLICATION,
} from '../actions/storeApplication';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  allApplication: [],
  userApplication: [],
  allPendingApplication: [],
  allApprovedApplication: [],
  adminUserApplication: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_APPLICATION:
      return {
        ...state,
        allApplication: action.storeApplicationInfo,
      };
    case SET_PENDING_APPLICATION:
      return {
        ...state,
        allPendingApplication: action.pendingStoreApplicationInfo,
      };
    case SET_USERBYADMIN_APPLICATION:
      return {
        ...state,
        adminUserApplication: action.adminUserStoreApplicationInfo,
      };
    case SET_USER_APPLICATION:
      return {
        ...state,
        userApplication: action.userApplicationInfo,
      };
    case SET_APPROVED_APPLICATION:
      return {
        ...state,
        allApprovedApplication: action.approvedApplicationInfo,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
