import React from 'react';
import { useSelector } from 'react-redux';
import AddPackage from './add';
import PackageItem from './packageItem';
import { getPackages, getBookingId, getCurrentStudioId } from '../../../../../selectors';

const Packages = () => {
  const packages = useSelector((state) => getPackages(state));
  const bookingId = useSelector((state) => getBookingId(state));
  const currentStudioId = useSelector((state) => getCurrentStudioId(state));

  let packageItems: any = '';

  if (packages.packages) {
    packageItems = packages.packages.map((item) => (
      <PackageItem
        pack={item}
        currentStudioId={currentStudioId}
        isManagerRole={packages.manager_roles}
        bookingId={bookingId}
      />
    ));
  }

  return (
    <>
      <AddPackage />
      {packageItems}
    </>
  );
};

export default Packages;
