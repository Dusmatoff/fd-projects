import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Delete from '@material-ui/icons/Delete';
import OpenInNew from '@material-ui/icons/OpenInNew';
import InputMask from 'react-input-mask';
import ClientSocials from '../ClientSocials';
import { openInNewTab } from '../../../../utils';
import useStyles from '../../../styles';

const ClientContacts = ({ data, hasPhoto }) => {
  const classes = useStyles();

  const {
    id,
    photo,
    name,
    email,
    phone,
    birthday,
    base64,
  } = data.values;

  const filePicked = (event) => {
    data.setFieldValue('selectedPhoto', event.target.files[0]);
    data.setFieldValue('submitButtonType', 'upload_photo');
    data.handleSubmit(event);
  };

  const [showIcon, setShowIcon] = useState(false);

  const deletePhoto = (event) => {
    data.setFieldValue('submitButtonType', 'delete_photo');
    data.handleSubmit(event);
  };

  return (
    <>
      <Grid item xs={4} xl={3}>
        <div
          className={classes.avatar}
          style={{ backgroundImage: `url("${photo}")` }}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
        >
          <input
            type="file"
            name="photo"
            id="icon-button-file"
            className={classes.dNone}
            onChange={filePicked}
            accept=".jpeg,.jpg,.png"
          />
          {showIcon && hasPhoto && (
          <label htmlFor="icon-button-file" className={classes.photoIconDelete}>
            <Delete
              color="secondary"
              fontSize="large"
              onClick={deletePhoto}
            />
          </label>
          )}
          {showIcon && (
            <label htmlFor="icon-button-file" className={classes.photoIcon}>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          )}
        </div>
      </Grid>
      <Grid item xs={5} xl={6}>
        <TextField
          name="name"
          placeholder="Name"
          value={name}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          error={data.touched.name && Boolean(data.errors.name)}
          helperText={data.touched.name && data.errors.name}
          className={`${classes.width100} ${classes.bigInput} ${classes.borderInput}`}
        />
        <TextField
          name="email"
          placeholder="Email"
          value={email}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          error={data.touched.email && Boolean(data.errors.email)}
          helperText={data.touched.email && data.errors.email}
          className={`${classes.width100} ${classes.borderInput} ${classes.boldInput} ${classes.fontSize1rem}`}
        />
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
        <Input name="id" value={id} type="hidden" />
      </Grid>
      <Grid item xs={3} className={classes.textRight}>
        <div className={classes.dBlock}>
          <span>
            ID:
            {id}
          </span>
          <OpenInNew className={classes.cursorPointer} onClick={() => { openInNewTab(`/wp-admin/admin.php?page=fdphotostudio_soft_client_search&id=${base64}`); }} />
        </div>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            name="birthday"
            label="Birthday"
            format="M/dd/yy"
            value={birthday || ''}
            onChange={(birthdayValue) => data.setFieldValue('birthday', birthdayValue)}
            onBlur={data.handleBlur}
            error={data.touched.birthday && Boolean(data.errors.birthday)}
            helperText={data.touched.birthday && data.errors.birthday}
            animateYearScrolling
            inputVariant="outlined"
            className={`${classes.dateInputBirthday} ${classes.width85} ${classes.input18px} ${classes.mt10}`}
          />
        </MuiPickersUtilsProvider>
        <br />
        <ClientSocials data={data} />
      </Grid>
    </>
  );
};

export default ClientContacts;
