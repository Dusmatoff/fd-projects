import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createGenerateClassName, StylesProvider, ThemeProvider, createMuiTheme,
} from '@material-ui/core/styles';
import ErrorModal from './components/ErrorModal';
import Loader from './components/Loader';
import AlertSuccess from './components/AlertSuccess';
import TabsBlock from './components/TabsBlock';
import {
  getUser,
  getUserId,
  isUserDataFetched,
  isLocManager,
  isManager,
  isAdmin,
} from './selectors';
import { fetchCategories } from './actions/categories';
import { fetchTypes } from './actions/types';
import { fetchVendors } from './actions/vendors';
import { fetchCurrentUser } from './actions/user';

const shopClassName = createGenerateClassName({
  productionPrefix: 'fd-purchase-jss',
  disableGlobal: false,
  seed: 'fd-purchase',
});


const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        background: '#fff!important',
        padding: '3px 30px 3px 15px!important',
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
  },
    palette: {
      secondary: {
        main: '#4aa0d7',
      },
      primary: {
        main: '#afe37e',
      },
    },
});

const App = ({ pageId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => getUser(state));
  const userId = useSelector((state) => getUserId(state));
  const userFetched = useSelector((state) => isUserDataFetched(state));
  const isCurrentUserLocManager = useSelector((state) => isLocManager(state));
  const isCurrentUserManager = useSelector((state) => isManager(state));
  const isCurrentUserAdmin = useSelector((state) => isAdmin(state));

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (userId) {
      if (isCurrentUserLocManager || isCurrentUserManager || isCurrentUserAdmin) {
        dispatch(fetchCategories());
        dispatch(fetchTypes());
        dispatch(fetchVendors());
      }
    }
  }, [userId]);

  if (user?.location?.length === 0) {
    return (
        <p>
          Wrong location! Your ip is:
          {' '}
          <b>{user.ip}</b>
        </p>
    );
  }

  return (
    <StylesProvider generateClassName={shopClassName}>
      <ThemeProvider theme={theme}>
        <Loader />
        <AlertSuccess />
        <ErrorModal />
        {userFetched && <TabsBlock pageId={pageId} user={user} />}
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
