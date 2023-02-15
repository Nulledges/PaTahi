import {SET_USER_INFO} from '../actions/user';
import {LOGOUT} from '../actions/authentication';
const initialState = {
  myInformation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        myInformation: action.userInfo,
      };
    case LOGOUT:
      return {...initialState};

    default:
      return state;
  }
};
