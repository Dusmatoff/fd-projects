import axios from 'axios';
import ExceptionWithData from '../exceptions/ExceptionWithData';

export const API_BASE_URL = window.localStorage.getItem('SYMFONY_API_BASE_URL');

export const checkError = (result) => {
  if ('status' in result && result.status > 299) {
    const message = result?.data?.error;
    if (message != null) {
      const data = result?.data?.data;
      if (data !== null) {
        throw new ExceptionWithData(message, data);
      }
      throw new Error(message);
    } else {
      throw new Error('Bad request');
    }
  }
};

export const getParamFromUrl = (param: string): string => {
  const urlString = new URL(window.location.href);
  return urlString.searchParams.get(param);
};

export const ajaxGet = (actionName: string, params: Object = {}) => {
  const query = objectToQuery(params);
  return axios
    .get(`${API_BASE_URL}/${actionName}${query}`)
    .then((res) => res.data)
    .catch((error) => checkError(error.response));
};

export const ajaxPost = (actionName, body) => axios
  .post(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const ajaxPut = (actionName, body) => axios
  .put(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const ajaxDelete = (actionName, body) => axios
  .delete(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const capacityObject = {
  pieces: 'pieces', box: 'box', packet: 'packet', case: 'case', backet: 'backet',
};
export const urgencyObject = {
  1: '1-Need asap', 2: '2-Urgent', 3: '3-Normal', 4: '4-Not urgent', 5: '5-At some point',
};
export const statusesObject = { requested: 'requested', ordered: 'ordered', received: 'received ' };
export const statusColors = { requested: '#000', ordered: '#F7CB49', received: '#2F8718' };
export const urgencyColors = {
  1: 'rgb(204, 0, 0, .5)',
  2: 'rgb(244, 204, 204, .5)',
  3: 'rgb(255, 255, 0, .5)',
  4: 'rgb(147, 196, 125, .5)',
  5: 'rgb(56, 118, 29, .5)',
};

export const defaultStatuses = {
  requested: true,
  ordered: true,
  received: true,
};

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `&${currentValue}=${params[currentValue]}`;
  });

  return query;
};
