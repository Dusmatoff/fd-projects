import * as types from '../actionTypes/app';
import * as categoryTypes from '../actionTypes/categories';
import { ajaxGet, ajaxPost } from '../utils';

export function fetchCategories() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const user = await ajaxGet('fd_shop_get_categories');

      dispatch({ type: categoryTypes.SET_CATEGORIES, payload: user });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export const addTransactionCategory = (data) => {
  const formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('payroll_amount', data.payroll_amount);
  formData.append('payroll_type', data.payroll_type);
  formData.append('debit_credit_category_id', data.debit_credit_category_id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('fd_shop_add_transaction_category', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const updateTransactionCategory = (data) => {
  const formData = new FormData();
  formData.append('id', data.id);
  formData.append('name', data.name);
  formData.append('payroll_amount', data.payroll_amount);
  formData.append('payroll_type', data.payroll_type);
  formData.append('debit_credit_category_id', data.debit_credit_category_id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('fd_shop_update_transaction_category', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteTransactionCategory = (id) => {
  const formData = new FormData();
  formData.append('id', id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deleteProduct = await ajaxPost('fd_shop_delete_transaction_category', formData);

      dispatch({ type: types.SHOW_ALERT, payload: deleteProduct.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};
