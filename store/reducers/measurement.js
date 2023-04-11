import {
  SET_USER_MEASUREMENT,
  SET_SPECIFIC_MEASUREMENT,
} from '../actions/measurement';
import {LOGOUT} from '../actions/authentication';

const initialState = {
  myMeasurement: [],
  specificMeasurement: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_MEASUREMENT:
      return {
        ...state,
        myMeasurement: action.myMeasurementInfo,
      };
    case SET_SPECIFIC_MEASUREMENT:
      return {
        ...state,
        specificMeasurement: action.specificMeasurementInfo,
      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
