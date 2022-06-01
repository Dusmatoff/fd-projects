import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  createGenerateClassName, StylesProvider, ThemeProvider, createMuiTheme,
} from '@material-ui/core/styles';
import Loader from './components/Loader';
import ErrorModal from './components/ErrorModal';
import AlertSuccess from './components/AlertSuccess';
import Booking from './components/Booking';
import CreateClientModal from './components/CreateClientModal';
import TabsBlock from './components/TabsBlock';
import { fetchBooking, setBookingId } from './actions/booking';
import { fetchBookingOption } from './actions/bookingOption';
import { fetchHalls } from './actions/halls';
import { fetchClient } from './actions/client';
import { fetchBookingLogs } from './actions/bookingLogs';
import { fetchTransactions } from './actions/transactions';
import { fetchPackages } from './actions/packages';
import { fetchCurrentUser } from './actions/app';
import {
  isBookingDataFetched,
  isBookingOptionFetched,
  isHallsFetched,
  isClientInfoFetched,
  getClientId,
  isBookingLogsFetched,
  isUserFetched,
} from './selectors';

const bookingClassName = createGenerateClassName({
  productionPrefix: 'fd-booking-jss',
  disableGlobal: false,
  seed: 'fd-booking',
});

const App = (props) => {
  const {
    setBookingIdAction,
    fetchBookingAction,
    fetchBookingOptionAction,
    optionFetched,
    fetchHallsAction,
    fetchClientAction,
    dataFetched,
    hallsFetched,
    clientInfoFetched,
    bookingId,
    clientId,
    fetchBookingLogsAction,
    bookingLogsFetched,
    fetchTransactionsAction,
    fetchPackagesAction,
    fetchCurrentUserAction,
    userFetched,
  } = props;

  useEffect(() => {
    setBookingIdAction();
    fetchBookingAction();
    fetchBookingOptionAction();
    fetchHallsAction();
    fetchBookingLogsAction();
    fetchTransactionsAction();
    fetchCurrentUserAction();
  }, [bookingId]);

  useEffect(() => {
    if (clientId) {
      fetchClientAction(clientId, bookingId);
      fetchPackagesAction(clientId);
    }
  }, [clientId]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4AA0D7',
        contrastText: '#fff',
      },
      secondary: {
        main: '#FD3D3F',
        contrastText: '#fff',
      },
    },
    overrides: {
      MuiCheckbox: {
        root: {
          padding: 5,
        },
      },
      MuiSelect: {
        select: {
          background: '#fff!important',
          padding: '3px 30px 3px 15px!important',
        },
      },
      MuiButton: {
        root: {
          textTransform: 'none',
          fontSize: '0.85rem',
        },
        sizeSmall: {
          fontSize: '0.6rem',
          padding: '2px 5px',
        },
      },
      MuiOutlinedInput: {
        root: {
          background: '#fff',
        },
        multiline: {
          background: '#fff',
        },
      },
      MuiDivider: {
        root: {
          height: 3,
          marginTop: 15,
          marginBottom: 15,
        },
      },
      MuiTab: {
        wrapper: {
          flexDirection: 'row',
        },
        labelIcon: {
          minHeight: 45,
        },
      },
      MuiInputLabel: {
        shrink: {
          color: '#000',
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: 0,
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 375,
        md: 768,
        lg: 1220,
        xl: 1680,
      },
    },
  });
  theme.typography.body1 = {
    fontSize: '1rem',
    '@media (max-width:1680px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.8rem',
    },
  };
  theme.typography.button = {
    fontSize: '1.1rem',
    '@media (max-width:1680px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.8rem',
    },
  };
  theme.typography.h3 = {
    fontSize: '1.3rem',

    '@media (max-width:1680px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1rem',
    },
  };
  theme.typography.h4 = {
    fontSize: '1.6rem',

    '@media (max-width:1680px)': {
      fontSize: '1.4rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1.2rem',
    },
  };
  theme.typography.h5 = {
    fontSize: '1.5rem',

    '@media (max-width:1680px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1.1rem',
    },
  };
  theme.typography.h6 = {
    fontSize: '1.6rem',

    '@media (max-width:1680px)': {
      fontSize: '1.4rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1.2rem',
    },
  };

  return (
    <StylesProvider generateClassName={bookingClassName}>
      <ThemeProvider theme={theme}>
        <AlertSuccess />
        <Loader />
        <ErrorModal />
        <CreateClientModal />
        <Grid container>
          <Grid item lg={5} xs={12}>
            {dataFetched && optionFetched && hallsFetched && clientInfoFetched && userFetched && <Booking />}
          </Grid>
          <Grid item lg={7} xs={12}>
            {clientInfoFetched && bookingLogsFetched && <TabsBlock />}
          </Grid>
        </Grid>
      </ThemeProvider>
    </StylesProvider>
  );
};

const mapStateToProps = (state) => ({
  dataFetched: isBookingDataFetched(state),
  optionFetched: isBookingOptionFetched(state),
  hallsFetched: isHallsFetched(state),
  clientInfoFetched: isClientInfoFetched(state),
  clientId: getClientId(state),
  bookingLogsFetched: isBookingLogsFetched(state),
  userFetched: isUserFetched(state),
});

const mapDispatchToProps = (dispatch, { bookingId }) => ({
  setBookingIdAction: () => dispatch(setBookingId(bookingId)),
  fetchBookingAction: () => dispatch(fetchBooking(bookingId)),
  fetchBookingOptionAction: () => dispatch(fetchBookingOption(bookingId)),
  fetchHallsAction: () => dispatch(fetchHalls()),
  fetchClientAction: (clientId, appId) => dispatch(fetchClient(clientId, appId)),
  fetchBookingLogsAction: () => dispatch(fetchBookingLogs(bookingId)),
  fetchTransactionsAction: () => dispatch(fetchTransactions(bookingId)),
  fetchPackagesAction: (clientId) => dispatch(fetchPackages(clientId)),
  fetchCurrentUserAction: () => dispatch(fetchCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
