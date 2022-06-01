import React from 'react';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import ErrorModal from './components/ErrorModal';
import Loader from './components/Loader';
import AlertSuccess from './components/AlertSuccess';
import ClientCrm from './components/ClientCrm';
import ClientRatings from './components/ClientRatings';
import EmployeeHours from './components/EmployeesHours';
import ManagerAnalytics from './components/ManagerAnalytics';

const softClassName = createGenerateClassName({
  productionPrefix: 'fd-soft-jss',
  disableGlobal: true,
  seed: 'fd-soft',
});

const App = (props) => {
  const { pageId } = props;

  let content = <ManagerAnalytics />;

  switch (pageId) {
    case 'fdphotostudio_soft_client_crm':
      content = <ClientCrm />;
      break;
    case 'fdphotostudio_soft_client_ratings':
      content = <ClientRatings />;
      break;
    case 'manager_analytics':
    case 'loc_manager_analytics':
      content = <EmployeeHours />;
      break;
  }

  return (
    <StylesProvider generateClassName={softClassName}>
      <div style={{ flexGrow: 1 }}>
        <Loader />
        <AlertSuccess />
        <ErrorModal />
        {content}
      </div>
    </StylesProvider>
  );
};

export default App;
