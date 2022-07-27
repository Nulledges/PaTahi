import {SET_STORE_APPLICATION} from '../actions/storeApplication';

const initialState = {
  allApplication: null,
  userApplication: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_APPLICATION:
      return {
        allApplication: action.storeApplicationInfo,
        userApplication: action.userApplicationInfo,
      };
    default:
      return state;
  }
};
