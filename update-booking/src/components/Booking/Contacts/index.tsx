import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputMask from 'react-input-mask';
import { canDone } from '../../../utils';
import useStyles from '../../styles';

const Contacts = (props) => {
  const classes = useStyles();

  const { data, client, user } = props;

  const {
    name, email, phone, id, appointmentKey, lastEditedBy, clientId, status, waitClient,
  } = data.values;

  const userRoles = Object.values(user.roles);

  const canChangeStatus = userRoles.every((role: string) => ['administrator', 'manager', 'loc_manager'].includes(role));

  return (
    <Grid container spacing={1} justify="space-between">
      <Grid item lg={7} xs={12}>
        <Input
          name="id"
          value={id}
          type="hidden"
        />
        <TextField
          name="name"
          placeholder="Name"
          value={name}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          error={data.touched.name && Boolean(data.errors.name)}
          helperText={data.touched.name && data.errors.name}
          className={`${classes.bigInput} ${classes.mb10} ${classes.borderInput} ${classes.width100}`}
        />
        <FormControl className={classes.width100}>
          <Input
            name="email"
            value={email}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.email && Boolean(data.errors.email)}
            className={`${classes.borderInput} ${classes.boldInput} ${classes.fontSize1rem}`}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  href={`mailto:${email}`}
                  target="_blank"
                  className={classes.iconMail}
                >
                  <MailOutlineIcon />
                </IconButton>
              </InputAdornment>
                          )}
            fullWidth
          />
        </FormControl>
        <div className={classes.inputBoxPhone}>
          <span>+1</span>
          <InputMask
            name="phone"
            mask="(999) 999-9999"
            onChange={data.handleChange}
            value={phone}
            className={classes.phoneInput}
          />
        </div>
        <p className={classes.red}>{data.errors.phone}</p>
      </Grid>
      <Grid item lg={5} xs={12} className={`${classes.textRight} ${classes.blockGridCenter}`}>
        <div className={`${classes.mb10} ${classes.fontWeight500}`}>
          <span>
            Booking #
            {id}
          </span>
          <br />
          <span>{appointmentKey}</span>
          <br />
          <span>
            Last edited by
            {lastEditedBy}
          </span>
          <br />
          <span>
            Client #
            <a
              target="_blank"
              href={`/wp-admin/admin.php?page=fdphotostudio_soft_client_search&id=${client.base64}`}
              rel="noreferrer"
            >
              {clientId}
            </a>
          </span>
        </div>

        <FormControl variant="outlined" className={`status-${status}`}>
          <InputLabel htmlFor="status">Status</InputLabel>
          <Select
            name="status"
            native
            value={status}
            onChange={data.handleChange}
            label="Status"
            inputProps={{
              name: 'status',
              id: 'status',
            }}
            disabled={!canChangeStatus}
          >
            <option value="pending">Pending</option>
            <option value="noanswer">No Answer</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Canceled</option>
            {status === 'checked in' ? <option value="checked in">Checked In</option> : ''}
            {canDone(data.values.date) && <option value="done">Done</option>}
            <option value="deleted">Deleted</option>
          </Select>
        </FormControl>

        {status === 'pending' && (
        <FormControlLabel
          control={(
            <Checkbox
              checked={waitClient}
              onChange={data.handleChange}
              name="waitClient"
              size="small"
              color="primary"
            />
)}
          label="Waiting for client"
          className={`whiteCheckbox ${classes.mar0}`}
        />
        )}
      </Grid>
    </Grid>
  );
};

export default Contacts;
