import * as types from '../actionTypes/app';
import * as productTypes from '../actionTypes/products';
import { ajaxGet, ajaxPost } from '../utils';

export function fetchProducts() {
  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const user = await ajaxGet('fd_shop_get_products');

      dispatch({ type: productTypes.SET_PRODUCTS, payload: user });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
}

export const addProduct = (data) => {
  let description = '';

  if (typeof data.description !== 'undefined') {
    description = data.description;
  }

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price_type', data.price_type);
  formData.append('price', data.price);
  formData.append('category_id', data.category_id);
  formData.append('description', description);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('fd_shop_add_product', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const updateProduct = (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.set(key, data[key]);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost('fd_shop_update_product', formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const deleteProduct = (id) => {
  const formData = new FormData();
  formData.append('id', id);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const deleteProduct = await ajaxPost('fd_shop_delete_product', formData);

      dispatch({ type: types.SHOW_ALERT, payload: deleteProduct.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};
