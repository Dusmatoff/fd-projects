import * as types from '../actionTypes/bookingOption';

export const bookingOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_BOOKING_OPTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
