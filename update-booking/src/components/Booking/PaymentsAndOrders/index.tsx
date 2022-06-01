import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Estimate from '../Estimate';
import Transactions from './Transactions';
import Order from './Order';
import RequestRefund from './RequestRefund';
import { WhiteButton } from '../../buttons';
import {
  getBooking, getBookingId, getTransactions, getTransactionsTotal,
} from '../../../selectors';
import useStyles from '../../styles';

const PaymentsAndOrders = () => {
  const classes = useStyles();

  const booking = useSelector((state) => getBooking(state));
  const transactionsTotal = useSelector((state) => getTransactionsTotal(state));
  const bookingId = useSelector((state) => getBookingId(state));
  const transactions = useSelector((state) => getTransactions(state));

  const { total } = transactions;

  return (
    <>
      <Grid container spacing={1} justify="flex-end">
        <Grid item className={classes.mr20}>
          <Typography
            variant="subtitle1"
            display="inline"
            className={transactionsTotal > 0 ? classes.green : classes.red}
          >
            <b>
              Total: $
              {transactionsTotal}
            </b>
          </Typography>
        </Grid>

        <Grid item>
          <Estimate rates={booking.rates} calcObj={booking.calcObj} />
        </Grid>
      </Grid>

      <Transactions />

      <br />

      <Grid container spacing={1} justify="center" className={classes.mbMinus20}>
        <Grid item>
          <Order />
        </Grid>
        <Grid item>
          {total > 0 && (
          <WhiteButton href={`/wp-admin/admin.php?page=invoice&booking_id=${bookingId}`} variant="contained">
            Send Receipt
          </WhiteButton>
          )}
        </Grid>
        {transactions.items.length > 0 && <Grid item><RequestRefund /></Grid>}
      </Grid>
    </>

  );
};

export default PaymentsAndOrders;
