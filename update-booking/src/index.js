import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './App';
import { getParamFromUrl } from './utils';

const bookingId = getParamFromUrl('updateid');

ReactDOM.render(
  <Provider store={store}>
    <App bookingId={bookingId} />
  </Provider>,
  document.getElementById('root'),
);
