import {AUTHENTICATE, LOGOUT} from '../actions/authentication';

const initialState = {
  token: null,
  userId: null,
  userType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userType: action.userType,
      };
    case LOGOUT:
      return {
        token: null,
        userId: null,
        ...initialState,
      };
    default:
      return state;
  }
};
