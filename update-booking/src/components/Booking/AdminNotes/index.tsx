import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles';

const AdminNotes = ({ data }) => {
  const classes = useStyles();

  const { from, aComment } = data.values;

  return (
    <>
      <div className={`${classes.width100} ${classes.textAreaAutosizeWrap} ${classes.mtMinus10}`}>
        <label
          className={`${classes.textAreaAutosizeLabel}  ${Boolean(data.errors.aComment) && classes.hasError} fd-booking-MuiFormLabel-root fd-booking-MuiInputLabel-root fd-booking-MuiInputLabel-formControl fd-booking-MuiInputLabel-animated fd-booking-MuiInputLabel-shrink fd-booking-MuiInputLabel-outlined fd-booking-MuiFormLabel-filled`}
          data-shrink="true"
          htmlFor="aComment"
        >
          Admin Notes
        </label>
        <TextareaAutosize
          className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosize} ${classes.fontSize085rem} ${Boolean(data.errors.aComment) && classes.hasError}`}
          name="aComment"
          id="aComment"
          aria-label="Admin Notes"
          rowsMin={2}
          value={aComment}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
        <p className={`${classes.errorText} ${Boolean(data.errors.aComment) && classes.hasError}`}>
          {data.errors.aComment}
        </p>
      </div>
      {from !== 'client' && from !== 'FD'
        && (
        <Typography align="center" color="secondary" variant="subtitle2">
          Please leave a review in Admin notes
        </Typography>
        )}
    </>
  );
};

export default AdminNotes;
