import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import useStyles from '../../../styles';

const Used = ({ transaction }) => {
  const classes = useStyles();

  const { packages, order_items: orderItems } = transaction;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let rentTotalSum = 0;

  orderItems.forEach((item) => {
    if (item.product_id === '1' || item.product_id === '5') {
      rentTotalSum += (item.quantity * item.price);
    }
  });

  let used = 0;

  const usedLists = packages.map((pack) => {
    used += +pack.amount;

    return (
      <Typography variant="body1" align="center" className={classes.padding}>
        <b>
          $
          {pack.amount}
          {' '}
          {pack.package_name}
          {' '}
          {pack.package_count > 1 && ` x ${pack.package_count}`}
          {' '}
        </b>
        {moment.unix(pack.timestamp).format('MM/DD/YYYY')}
      </Typography>
    );
  });

  const leftAmount = rentTotalSum - used;

  const LEFT = Number.isInteger(leftAmount) ? leftAmount : leftAmount.toFixed(2);

  return (
    <>
      <Typography
        display="block"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.fontSize14}
      >
        <u>
          left
          {' '}
          <span className={`${classes.cursorPointer} ${LEFT > 1 ? classes.green : classes.red}`}>
            $
            {LEFT < 1 ? 0 : LEFT}
          </span>
        </u>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {usedLists}
        <Typography variant="body1" align="center" className={classes.padding}>
          <b>Used:</b>
          {' '}
          {used.toFixed(2)}
          <b className={classes.ml20}>Left:</b>
          {' '}
          {LEFT}
        </Typography>
      </Popover>
    </>
  );
};

export default Used;
