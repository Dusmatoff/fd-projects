import React from 'react';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import FdLoader from './flip.gif';
import { isLoader } from '../../selectors';
import useStyles from '../styles';

const Loader = (props) => {
  const classes = useStyles();
  const { showLoader } = props;

  return (
    <Backdrop className={classes.backdrop} open={showLoader}>
      <img src={FdLoader} alt="FDPhotoStudio loader" />
    </Backdrop>
  );
};

const mapStateToProps = (state) => ({
  showLoader: isLoader(state),
});

export default connect(mapStateToProps, null)(Loader);
