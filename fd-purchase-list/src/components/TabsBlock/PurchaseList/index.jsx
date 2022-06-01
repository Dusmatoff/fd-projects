import React from 'react';
import { useSelector } from 'react-redux';
import {
  isWorker, isLocManager, isManager, isAdmin,
} from '../../../selectors';
import WorkerPurchaseList from './worker';
import LocManagerPurchaseList from './locManager';
import AdminPurchaseList from './admin';

const PurchaseList = () => {
  const isCurrentUserWorker = useSelector((state) => isWorker(state));
  const isCurrentUserLocManager = useSelector((state) => isLocManager(state));
  const isCurrentUserManager = useSelector((state) => isManager(state));
  const isCurrentUserAdmin = useSelector((state) => isAdmin(state));

  if (isCurrentUserWorker) {
    return (<WorkerPurchaseList />);
  }

  if (isCurrentUserLocManager) {
    return (<LocManagerPurchaseList />);
  }

  if (isCurrentUserManager || isCurrentUserAdmin) {
    return (<AdminPurchaseList />);
  }

  return null;
};

export default PurchaseList;
