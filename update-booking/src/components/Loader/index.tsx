import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import FdLoader from './flip.gif';
import { isLoader } from '../../selectors';
import useStyles from '../styles';

const Loader = () => {
  const classes = useStyles();

  const showLoader = useSelector((state) => isLoader(state));

  return (
    <Backdrop className={classes.backdrop} open={showLoader}>
      <img src={FdLoader} alt="FDPhotoStudio loader" />
    </Backdrop>
  );
};

export default Loader;
