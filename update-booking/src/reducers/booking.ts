import * as types from '../actionTypes/booking';

export const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_BOOKING:
      return { ...state, ...action.payload };
    case types.SHOW_CONTINUE_OVERLAPPING:
      return { ...state, continueOverlapping: true, continueOverlappingMessage: action.payload };

    case types.HIDE_CONTINUE_OVERLAPPING:
      return { ...state, continueOverlapping: false };

    default:
      return state;
  }
};
