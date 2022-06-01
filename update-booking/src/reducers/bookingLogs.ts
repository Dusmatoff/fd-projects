import * as types from '../actionTypes/bookingLogs';

export const bookingLogsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_BOOKING_LOGS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
