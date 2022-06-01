import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './App';
import { getParamFromUrl } from './utils';

const pageId = getParamFromUrl('page');

ReactDOM.render(
  <Provider store={store}>
    <App pageId={pageId} />
  </Provider>,
  document.getElementById('fd-purchase-list-root'),
);
