import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getBooking } from '../../../selectors';
import { fetchBooking } from '../../../actions/booking';
import { updateStudioNote } from '../../../actions/halls';
import { BlueButton } from '../../buttons';
import useStyles from '../../styles';

const StudioNote = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const booking = useSelector((state) => getBooking(state));

  const canEdit = booking.can_edit_studio_note;
  const studioNote = booking.current_hall.studio_note;

  /* FORMIK */
  const validationSchema = Yup.object({
    studioNote: Yup.string().max(750),
  });

  const initialValues = {
    hallId: booking.hall_id,
    studioNote,
  };
  /* FORMIK */

  if (canEdit) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          Promise.resolve(dispatch(updateStudioNote(values))).then(() => {
            dispatch(fetchBooking(booking.id));
          });
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosizeWrap}`}>
              <label
                className={`${classes.textAreaAutosizeLabel}  ${Boolean(formikProps.errors.studioNote) && classes.hasError} fd-booking-MuiFormLabel-root fd-booking-MuiInputLabel-root fd-booking-MuiInputLabel-formControl fd-booking-MuiInputLabel-animated fd-booking-MuiInputLabel-shrink fd-booking-MuiInputLabel-outlined fd-booking-MuiFormLabel-filled`}
                data-shrink="true"
                htmlFor="studioNote"
              >
                Studio Note
              </label>
              <TextareaAutosize
                className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosize} ${classes.fontSize085rem} ${Boolean(formikProps.errors.studioNote) && classes.hasError}`}
                name="studioNote"
                id="studioNote"
                aria-label="Studio Note"
                rowsMin={2}
                value={formikProps.values.studioNote}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              <p className={`${classes.errorText} ${Boolean(formikProps.errors.studioNote) && classes.hasError}`}>
                {formikProps.errors.studioNote}
              </p>
            </div>
            <BlueButton variant="contained" type="submit" size="small">
              Update
            </BlueButton>
          </form>
        )}
      </Formik>
    );
  }

  return (
    <div className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosizeWrap}`}>
      <label
        className={`${classes.textAreaAutosizeLabel} fd-booking-MuiFormLabel-root fd-booking-MuiInputLabel-root fd-booking-MuiInputLabel-formControl fd-booking-MuiInputLabel-animated fd-booking-MuiInputLabel-shrink fd-booking-MuiInputLabel-outlined fd-booking-MuiFormLabel-filled`}
        data-shrink="true"
        htmlFor="studioNote"
      >
        Studio Note
      </label>
      <TextareaAutosize
        className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosize}`}
        rowsMin={2}
        value={studioNote}
        id="studioNote"
        readOnly={studioNote}
      />
    </div>
  );
};

export default StudioNote;
