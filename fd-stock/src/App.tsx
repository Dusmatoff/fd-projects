import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import ErrorModal from './components/ErrorModal';
import Loader from './components/Loader';
import AlertSuccess from './components/AlertSuccess';
import Locations from './components/Locations';
import TabsBlock from './components/TabsBlock';
import {
  isUserFetched, getUser, getUserId, isUserAdmin,
} from './store/selectors';
import { fetchCurrentUser } from './store/actions/user';
import { fetchCategories } from './store/actions/categories';
import { fetchItems } from './store/actions/items';

const stockClassName = createGenerateClassName({
  productionPrefix: 'fd-stock-jss',
  disableGlobal: true,
  seed: 'fd-stock',
});

const App = () => {
  const dispatch = useDispatch();

  const userFetched = useSelector((state) => isUserFetched(state));
  const user = useSelector((state) => getUser(state));
  const userId = useSelector((state) => getUserId(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (userId) {
      const isDeletedParam = isAdmin ? 1 : 0;

      dispatch(fetchItems(isDeletedParam));
      dispatch(fetchCategories());
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
    <StylesProvider generateClassName={stockClassName}>
      <div style={{ flexGrow: 1, marginTop: 30 }}>
        <Loader />
        <AlertSuccess />
        <ErrorModal />
        {userFetched && (
        <>
          <Locations />
          <TabsBlock />
        </>
        )}
      </div>
    </StylesProvider>
  );
};

export default App;
