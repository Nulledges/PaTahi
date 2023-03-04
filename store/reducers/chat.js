import {SET_CHAT_MEMBERS, SET_MESSAGES} from '../actions/chat';
import {LOGOUT} from '../actions/authentication';

const initialState = {
  messages: [],
  chatList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_MEMBERS:
      return {
        ...state,
        chatList: action.memberList,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messageList,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
