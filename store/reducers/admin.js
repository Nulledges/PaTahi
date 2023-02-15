import {SET_PENDING_VERIFICATION_FORM} from '../actions/admin';
import {LOGOUT} from '../actions/authentication';

const initialState = {
  allPendingVerificationForms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PENDING_VERIFICATION_FORM:
      return {
        ...state,
        allPendingVerificationForms: action.pendingStoreVerificationFormInfo,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
