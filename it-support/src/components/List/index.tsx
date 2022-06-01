import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TabsBlock from './TabsBlock';
import { addScreenshot, hideList } from '../../store/actions/app';
import { isShowList } from '../../store/selectors';
import { fetchRequests, fetchRequestsUpdates } from '../../store/actions/requests';
import useStyles from '../styles';

export default function List() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showList = useSelector((state) => isShowList(state));

  const handleClose = () => {
    dispatch(hideList());
    dispatch(addScreenshot(null));
  };

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchRequestsUpdates());
  }, []);

  return (
    <Dialog maxWidth="lg" style={{ height: 1000 }} className={classes.adminView} onClose={handleClose} open={showList} fullWidth data-html2canvas-ignore="true" classes={{ container: classes.baseline }}>
      <div>
        <MuiDialogTitle disableTypography className={`${classes.root} ${classes.titleNewRequest}`}>
          <Typography variant="h6">Requests List</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{ position: 'absolute' }}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.modalContent}>
          <TabsBlock />
        </MuiDialogContent>
      </div>
    </Dialog>
  );
}
