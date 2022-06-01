import React from 'react';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import useStyles from '../../styles';

const Estimate = (props) => {
  const classes = useStyles();
  const { rates, calcObj } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className={classes.textRight}>
      <Typography
        variant="subtitle1"
        display="inline"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.fontSize15}
      >
        Estimate $
        {calcObj.total_rate}
        {' '}
        <i className="fa fa-question-circle" />
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
        <Typography variant="h6" align="center">
          {rates.current ? 'Use current rate:' : ''}
          {' '}
          {rates.before ? `Use rate before(${moment.unix(rates.before).format('MM/DD/YYYY')})` : ''}
          {' '}
          {calcObj.string}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell size="small">Regular</TableCell>
                <TableCell size="small">Weekend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(rates).map((hour) => (
                hour !== 'current'
                                && (
                                <TableRow key={hour}>
                                  <TableCell size="small" className={calcObj.rateType.hours.includes(hour) && calcObj.rateType.day === 'regular' && classes.currentRateBg}>
                                    {hour !== '1' ? `${hour}h @ $${rates[hour].regular} = $${rates[hour].regular * (+hour)} (${Math.round(100 - (rates[hour].regular / rates[1].regular) * 100)}% off)` : `${hour}h @ $${rates[hour].regular}`}
                                  </TableCell>
                                  <TableCell size="small" className={calcObj.rateType.hours.includes(hour) && calcObj.rateType.day === 'weekend' && classes.currentRateBg}>
                                    {hour !== '1' ? `${hour}h @ $${rates[hour].weekend} = $${rates[hour].weekend * (+hour)} (${Math.round(100 - (rates[hour].weekend / rates[1].weekend) * 100)}% off)` : `${hour}h @ $${rates[hour].weekend}`}
                                  </TableCell>
                                </TableRow>
                                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
};

export default Estimate;
