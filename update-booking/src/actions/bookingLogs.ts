import * as bookingLogsTypes from '../actionTypes/bookingLogs';
import * as types from '../actionTypes/app';
import { ajaxPost } from '../utils';

export function fetchBookingLogs(id) {
  const formData = new FormData();
  formData.set('action', 'get_booking_logs_react');
  formData.set('id', id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const logs = await ajaxPost(formData);

      dispatch({ type: bookingLogsTypes.SET_BOOKING_LOGS, payload: logs });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export function addLog(values) {
  const formData = new FormData();
  formData.set('action', 'add_log_action_react');

  for (const key in values) {
    formData.set(key, values[key]);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}
