import * as bookingOptionTypes from '../actionTypes/bookingOption';
import * as types from '../actionTypes/app';
import { ajaxGet } from '../utils';

export const fetchBookingOption = (bookingId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const bookingOption = await ajaxGet('get_booking_option', { id: bookingId });

    dispatch({ type: bookingOptionTypes.SET_BOOKING_OPTION, payload: bookingOption });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
