import axios from 'axios';
import moment from 'moment';
import ExceptionWithData from '../exceptions/ExceptionWithData';

export const API_BASE_URL = window.localStorage.getItem('SYMFONY_API_BASE_URL');
export const MOMENT_FORMAT_TIME = 'hh:mm A';

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
    .get(`/wp-admin/admin-ajax.php?action=${actionName}${query}`)
    .then((res) => res.data)
    .catch((error) => checkError(error.response));
};

export const ajaxPost = (formData) => axios
  .post('/wp-admin/admin-ajax.php', formData)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const ajaxPostSymfony = (actionName, body) => axios
  .post(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

export const updateBooking = (bookingId) => ajaxGet('get_update_booking', { id: bookingId });

export const getTransactionCategories = (): Object => ({
  10: 'rent',
  20: 'people',
  30: 'cleaning',
  40: 'deposit',
  50: 'rate differ',
  60: 'prepaid',
  70: 'backdrops',
  99: 'other',
  105: 'mec',
  0: 'no category',
});

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `&${currentValue}=${params[currentValue]}`;
  });

  return query;
};

export const validateAddProduct = (values) => {
  if (Number(values.quantity) < 1) {
    alert('Min quantity is 1');
    return false;
  }

  if (Number(values.productPrice) < 0.02) {
    alert('Min price is 0.02');
    return false;
  }

  return true;
};

export const getCartTotal = (items: Array<any>) => {
  const total = items.reduce((prev, curr) => prev + (curr.price * curr.qty), 0);
  return Number.parseFloat(total).toFixed(2);
};

export const anyAvailableIds = [7, 113, 147];

export const openAppPage = () => {
  window.open('/wp-admin/admin.php?page=appointment-calendar', '_self');
};

export const canDone = (date: string):boolean => new Date() > new Date(date);

export const openInNewTab = (url) => window.open(url, '_blank').focus();

export const isEndSmallerStartTime = (start: string, end: string):boolean => {
  const startTime = moment(start, MOMENT_FORMAT_TIME);
  const endTime = moment(end, MOMENT_FORMAT_TIME);

  return endTime.isBefore(startTime);
};

export const roundTime = (date, duration, method) => moment(Math[method]((+date) / (+duration)) * (+duration));

export const getFormatMethod = (date1, date2): string => (moment(date1, MOMENT_FORMAT_TIME).isBefore(moment(date2, MOMENT_FORMAT_TIME)) ? 'ceil' : 'floor');

export const errorMessages = {
  phone: 'Please provide valid phone',
  name: 'Please provide valid name',
  email: 'Please provide valid email',
  sum: 'Add sum',
};
