import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './App';

document.getElementById('wpadminbar').setAttribute('data-html2canvas-ignore', 'true');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('wp-admin-bar-it_support'),
);
