import * as types from '../actionTypes/app';
import * as inventoryTypes from '../actionTypes/inventory';
import { ajaxGet, ajaxPost } from '../../utils';

export const fetchInventory = (locationId: number, isDeleted: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const inventory = await ajaxGet('stock/inventory', { locationId, isDeleted });

    dispatch({ type: inventoryTypes.SET_INVENTORY, payload: inventory });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addInventory = (changes, locationId) => async function (dispatch) {
  try {
    dispatch({ type: types.SHOW_LOADER });

    const formData = new FormData();
    formData.append('locationId', locationId);

    for (const item in changes) {
      const { id, new_qty: qty, name } = changes[item].newData;

      if (qty < 0) {
        const errorMessage = `Quantity of ${name} cannot be negative`;
        throw new Error(errorMessage);
      }

      formData.append('changes[]', JSON.stringify({ id, qty }));
    }

    const result = await ajaxPost('stock/inventory', formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const fetchInventoryReport = (locationId: number) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const inventory = await ajaxGet('stock/inventory-report', { locationId });

    dispatch({ type: inventoryTypes.SET_INVENTORY, payload: inventory });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};
