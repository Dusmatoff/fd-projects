import moment from 'moment';
import * as types from '../actionTypes/app';
import { ajaxGet, ajaxPost, getCartTotal } from '../utils';

export const showLoader = (): Object => ({ type: types.SHOW_LOADER });

export const hideLoader = (): Object => ({ type: types.HIDE_LOADER });

export const showError = (): Object => ({ type: types.SHOW_ERROR });

export const hideError = (): Object => ({ type: types.HIDE_ERROR });

export const showAlert = (message): Object => ({ type: types.SHOW_ALERT, payload: message });

export const hideAlert = (): Object => ({ type: types.HIDE_ALERT });

export const showCreateClientModal = (): Object => ({ type: types.SHOW_CREATE_CLIENT_MODAL });

export const hideCreateClientModal = (): Object => ({ type: types.HIDE_CREATE_CLIENT_MODAL });

export const prepareClientHours = (values) => {
  const formData = new FormData();
  formData.set('action', 'prepare_client_hours_react');
  formData.set('app_id', values.bookingId);
  formData.set('stage_id', values.hallId);
  formData.set('package_id', values.packageId);

  switch (values.packageId) {
    case '1':
      formData.set('package_name', 'Rent by hour');
      break;
    case '4':
      formData.set('package_name', '4 hour pack');
      break;
    case '8':
      formData.set('package_name', '8 hour pack');
      break;
    case '12':
    default:
      formData.set('package_name', '12 hour pack');
      break;
  }

  formData.set('package_count', values.packageCount);
  formData.set('hours_date', moment(values.hoursDate).format('MM.DD.YY'));
  formData.set('is_weekend', values.isWeekend);
  formData.set('client_id', values.clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const prepare = await ajaxPost(formData);

      dispatch({
        type: types.SET_PREPARE_CLIENT_HOURS,
        payload: prepare,
      });

      dispatch({
        type: types.SHOW_ALERT,
        payload: 'Prepare client hours done',
      });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const sendPaymentLink = (values) => {
  const formData = new FormData();
  formData.set('action', 'send_payment_link_react');
  formData.set('client_id', values.clientId);
  formData.set('payment_email', values.paymentEmail);
  formData.set('amount', values.cart.total);
  formData.set('insert_booking_log', values.insertBookingLog);
  formData.set('app_id', values.bookingId);
  formData.set('note', values.sendPaymentNote);

  if (values.cart.items.length > 0) {
    for (let i = 0; i < values.cart.items.length; i += 1) {
      const product = JSON.stringify(values.cart.items[i]);
      formData.append('products[]', product);
    }
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const send = await ajaxPost(formData);

      if (send.result) {
        dispatch({
          type: types.SHOW_ALERT,
          payload: 'Payment link sent successfully',
        });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: 'Error payment link. Please try again' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const setCart = (items: Array<object>) => {
  const total = getCartTotal(items);

  return { type: types.SET_CART, payload: { items, total } };
};

export const clearCart = () => ({ type: types.SET_CART, payload: { items: [], total: 0 } });

export const fetchCurrentUser = () => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('get_current_user_react');

    dispatch({ type: types.SET_USER, payload: result.user });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
