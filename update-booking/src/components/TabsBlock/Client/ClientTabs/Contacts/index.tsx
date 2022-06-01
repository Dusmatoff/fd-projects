import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import useStyles from '../../../../styles';

export default function ClientContacts(props) {
  const classes = useStyles();

  const { data } = props;
  const {
    name2, name3, email2, email3, phone2, phone3,
  } = data.values;

  return (
    <Table size="small" className={classes.mt10}>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">Names</TableCell>
          <TableCell padding="checkbox">Phones</TableCell>
          <TableCell padding="checkbox">Emails</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell padding="checkbox">
            <TextField
              name="name2"
              placeholder="Name 2"
              InputLabelProps={{ shrink: true }}
              value={name2}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              error={data.touched.name2 && Boolean(data.errors.name2)}
              helperText={data.touched.name2 && data.errors.name2}
              className={classes.inputPadding0}
            />
          </TableCell>
          <TableCell padding="checkbox">
            <div className={classes.inputBoxPhone}>
              <span>+1</span>
              <InputMask
                name="phone2"
                mask="(999) 999-9999"
                onChange={data.handleChange}
                value={phone2}
                className={classes.phoneInput}
              />
            </div>
            <p className={classes.red}>{data.errors.phone2}</p>
          </TableCell>
          <TableCell padding="checkbox">
            <TextField
              name="email2"
              placeholder="Email 2"
              value={email2}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              error={data.touched.email2 && Boolean(data.errors.email2)}
              helperText={data.touched.email2 && data.errors.email2}
              className={classes.inputPadding0}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox">
            <TextField
              name="name3"
              placeholder="Name 3"
              value={name3}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              error={data.touched.name3 && Boolean(data.errors.name3)}
              helperText={data.touched.name3 && data.errors.name3}
              className={classes.inputPadding0}
            />
          </TableCell>
          <TableCell padding="checkbox">
            <div className={classes.inputBoxPhone}>
              <span>+1</span>
              <InputMask
                name="phone3"
                mask="(999) 999-9999"
                onChange={data.handleChange}
                value={phone3}
                className={classes.phoneInput}
              />
            </div>
            <p className={classes.red}>{data.errors.phone3}</p>
          </TableCell>
          <TableCell padding="checkbox">
            <TextField
              name="email3"
              placeholder="Email 3"
              value={email3}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              error={data.touched.email3 && Boolean(data.errors.email3)}
              helperText={data.touched.email3 && data.errors.email3}
              className={classes.inputPadding0}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
