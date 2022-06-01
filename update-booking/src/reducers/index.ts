import { combineReducers } from 'redux';
import { bookingReducer } from './booking';
import { bookingOptionReducer } from './bookingOption';
import { appReducer } from './app';
import { hallsReducer } from './halls';
import { clientReducer } from './client';
import { bookingLogsReducer } from './bookingLogs';
import { transactionsReducer } from './transactions';
import { packagesReducer } from './packages';

export const rootReducer = combineReducers({
  app: appReducer,
  booking: bookingReducer,
  bookingOption: bookingOptionReducer,
  bookingLogs: bookingLogsReducer,
  halls: hallsReducer,
  client: clientReducer,
  transactions: transactionsReducer,
  packages: packagesReducer,
});
