import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import moment from 'moment';
import ClientAgreements from '../ClientAgreements';
import useStyles from '../../../styles';

const ClientStatistics = ({ data, client }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid container spacing={1} justify="space-between" alignItems="flex-end" >
      <Grid item xs={12} md={6} xl={3}>
        <Paper className={`${classes.padding} ${classes.relative}`}>
          <Typography variant="body1" align="center">
            {client.karma.total}
            {' '}
            bookings
          </Typography>
          <Typography variant="body1" align="center">
            {client.karma.percent}
            % Canceled
          </Typography>
          <i
            className={`fa fa-question-circle agreement-icon ${classes.absolute} ${classes.bookingStatistic}`}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
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
            <Table aria-label="Status statistic">
              <TableHead>
                <TableRow>
                  <TableCell size="small">Status</TableCell>
                  <TableCell size="small">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(client.karma.statuses).map((item) => (
                  <TableRow key={client.karma.statuses[item].status}>
                    <TableCell size="small">{client.karma.statuses[item].status}</TableCell>
                    <TableCell size="small">{client.karma.statuses[item].count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Popover>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} xl={3}>
        <ClientAgreements data={data} client={client} />
      </Grid>

      <Grid item xs={12} md={6} xl={3}>
        <Paper className={classes.padding}>
          <Typography variant="body1" align="center">
            {client.hours_left}
            {' '}
            hours left
            <br />
            {' '}
            on account
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <Paper className={`${classes.padding} ${classes.verticalCenter}`}>
          {client.last_visit ? (
            <Typography variant="body1" align="center">
              Last visit
              <br />
              {`${moment(client.last_visit.date).fromNow()}`}
              {' at '}
              <a
                href={`/wp-admin/admin.php?page=update-booking&updateid=${client.last_visit.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {client.last_visit.name}
              </a>
            </Typography>
          ) : (
            <Typography variant="body1" align="center">
              First visit
            </Typography>
          ) }
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ClientStatistics;
