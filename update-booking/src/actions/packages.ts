import moment from 'moment';
import * as packagesTypes from '../actionTypes/packages';
import * as types from '../actionTypes/app';
import { ajaxPost } from '../utils';

export const fetchPackages = (clientId) => {
  const formData = new FormData();
  formData.set('action', 'get_client_hours_react');
  formData.set('client_id', clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const packages = await ajaxPost(formData);

      dispatch({ type: packagesTypes.SET_PACKAGES, payload: packages });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const addClientHours = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_client_hours');
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
  formData.set('package_txn_id', values.packageTxnId);
  formData.set('hours_date', moment(values.hoursDate).format('MM.DD.YY'));
  formData.set('is_weekend', values.isWeekend);
  formData.set('client_id', values.clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const add = await ajaxPost(formData);

      if (add.result) {
        dispatch({ type: types.SET_PREPARE_CLIENT_HOURS, payload: {} });

        dispatch({ type: types.SHOW_ALERT, payload: 'Client hours added' });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: add.error });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deletePackageHours = (id, clientId) => {
  const formData = new FormData();
  formData.set('action', 'delete_package_hours');
  formData.set('id', id);
  formData.set('client_id', clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deletePackage = await ajaxPost(formData);

      if (deletePackage.result) {
        dispatch({ type: types.SHOW_ALERT, payload: 'Package hours deleted' });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: 'Package hours not deleted' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteSpentHours = (spentId, clientId) => {
  const formData = new FormData();
  formData.set('action', 'delete_spent_hours');
  formData.set('spent_id', spentId);
  formData.set('client_id', clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deleteSpent = await ajaxPost(formData);

      if (deleteSpent.result) {
        dispatch({ type: types.SHOW_ALERT, payload: 'Spent hours deleted' });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: 'Spent hours not deleted' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const addSpentHours = (values) => {
  const formData = new FormData();
  formData.set('action', 'add_spent_hours');
  formData.set('stage_id', values.stageId);
  formData.set('package_id', values.packageId);
  formData.set('appointment_id', values.bookingId);
  formData.set('hours', values.hours);
  formData.set('client_id', values.clientId);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deleteSpent = await ajaxPost(formData);

      if (deleteSpent.result) {
        dispatch({ type: types.SHOW_ALERT, payload: 'Spent hours added' });
      } else {
        dispatch({ type: types.SHOW_ERROR, payload: 'Spent hours not added' });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};
