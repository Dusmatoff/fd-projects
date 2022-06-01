import axios from 'axios';
import moment from 'moment';

export const API_BASE_URL = window.localStorage.getItem('SYMFONY_API_BASE_URL');

export const checkError = (result) => {
  if ('status' in result && result.status > 299) {
    const message = result?.data?.error;
    if (message != null) {
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
    .get(`${API_BASE_URL}/${actionName}?${query}`)
    .then((res) => res.data)
    .catch((error) => checkError(error.response));
};

export const ajaxPost = (actionName, body) => axios
  .post(`${API_BASE_URL}/${actionName}`, body)
  .then((res) => res.data)
  .catch((error) => checkError(error.response));

const objectToQuery = (params: Object): string => {
  let query = '';

  Object.keys(params).forEach((currentValue) => {
    query += `${currentValue}=${params[currentValue]}&`;
  });

  return query;
};

export const getListOfMonths = (count: number) => {
  const dateStart = moment().subtract(count, 'M');
  const dateEnd = moment();
  const result = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    result.push(dateStart.format('MM-YYYY'));
    dateStart.add(1, 'month');
  }

  return result;
};

export const roundToDec = (sec: number) => {
  const result = sec / 3600;

  return Number.isInteger(result) ? result : result.toFixed(2);
};

export const calcRentWorkedHours = (sumHours, ordinary, overtime, monthYear, locationId) => {
  let coef = 0;

  if ((monthYear in sumHours) && (locationId in sumHours[monthYear]) && (monthYear in overtime) && (locationId in overtime[monthYear])) {
    coef = ((sumHours[monthYear][locationId] / (ordinary[monthYear][locationId] + overtime[monthYear][locationId])) * 60);
  }

  if (Number.isNaN(coef) || !Number.isFinite(coef)) {
    return 0;
  }

  return Number.isInteger(coef) ? coef : coef.toFixed(2);
};

export const formatClockHours = (sec: any) => {
  const suffix = sec > 0 ? 'late' : 'early';
  const time = moment('2022-01-01').startOf('day').seconds(Math.abs(sec)).format('H:mm');

  return `${time} ${suffix}`;
};
