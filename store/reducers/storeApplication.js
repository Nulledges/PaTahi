import {
  SET_MY_VERIFICATION_HISTORY,

  /*   SET_STORE_APPLICATION,
  SET_USER_APPLICATION,
  SET_USERBYADMIN_APPLICATION,
  SET_APPROVED_APPLICATION, */
} from '../actions/storeApplication';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  userVerificationHistory: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_VERIFICATION_HISTORY:
      return {
        ...state,
        userVerificationHistory: action.myVerificationHistory,
      };
    /*     case SET_STORE_APPLICATION:
      return {
        ...state,
        allApplication: action.storeApplicationInfo,
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
      }; */
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
