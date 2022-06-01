import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import SupportMenu from './components/SupportMenu';
import NewRequest from './components/NewRequest';
import List from './components/List';
import ErrorModal from './components/ErrorModal';
import Loader from './components/Loader';
import AlertSuccess from './components/AlertSuccess';
import { fetchCurrentUser } from './store/actions/user';
import { fetchRequestsUpdates } from './store/actions/requests';
import { isUserFetched, isShowNewRequest, isShowList } from './store/selectors';

const stockClassName = createGenerateClassName({
  productionPrefix: 'it-support-jss',
  disableGlobal: true,
  seed: 'it-support',
});

const App = () => {
  const dispatch = useDispatch();

  const userFetched = useSelector((state) => isUserFetched(state));
  const showForm = useSelector((state) => isShowNewRequest(state));
  const showList = useSelector((state) => isShowList(state));

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchRequestsUpdates());
  }, []);

  return (
    <StylesProvider generateClassName={stockClassName}>
      <div style={{ flexGrow: 1 }}>
        {userFetched && (
        <>
          <SupportMenu />
          {showForm && <NewRequest />}
          {showList && <List />}
        </>
        )}
        <Loader />
        <AlertSuccess />
        <ErrorModal />
      </div>
    </StylesProvider>
  );
};

export default App;
