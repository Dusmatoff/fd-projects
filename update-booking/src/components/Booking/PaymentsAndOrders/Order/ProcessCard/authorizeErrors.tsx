import React from 'react';
import moment from 'moment';
import Collapse from '@material-ui/core/Collapse';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { GreyButton } from '../../../../buttons';
import useStyles from '../../../../styles';

const AuthorizeErrors = (props) => {
  const classes = useStyles();

  const { errors } = props;

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  let tableRows: any = '';
  if (errors.length > 0) {
    tableRows = Object.keys(errors).map((item, i) => (
      <TableRow>
        <TableCell>{errors[i].id}</TableCell>
        <TableCell>
          $
          {errors[i].amount}
        </TableCell>
        <TableCell>{moment.unix(+errors[i].stamp).format('M.DD.YY')}</TableCell>
        <TableCell>{errors[i].error_code}</TableCell>
        <TableCell className={classes.lineBreakAnywhere}>{errors[i].error_msg}</TableCell>
      </TableRow>
    ));
  }

  return (
    <>
      <GreyButton
        variant="contained"
        fullWidth
        endIcon={<ArrowDropDown />}
        onClick={handleClick}
      >
        Authorize.net Errors
      </GreyButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Table stickyHeader padding="checkbox" className={classes.mt10}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </Collapse>
    </>
  );
};

export default AuthorizeErrors;
