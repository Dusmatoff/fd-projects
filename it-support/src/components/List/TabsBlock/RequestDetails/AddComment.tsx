import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { addScreenshot, showLoader, hideLoader } from '../../../../store/actions/app';
import {
  addComment, fetchRequests, fetchRequestsUpdates, fetchRequestComments,
} from '../../../../store/actions/requests';
import { getScreenshot } from '../../../../store/selectors';
import {
  SUPPORTED_IMAGE_FORMATS, IMAGE_MAX_FILE_SIZE, VIDEO_MAX_FILE_SIZE,
} from '../../../../utils';
import useStyles from '../../../styles';
import { DarkGreenButton } from '../../../buttons';

export default function AddComment({ requestId }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const screenshot = useSelector((state) => getScreenshot(state));

  const makeScreenshot = async () => {
    dispatch(showLoader());
    const options = {
      height: window.innerHeight,
      windowHeight: window.innerHeight + window.scrollY,
      y: window.scrollY,
    };
    html2canvas(document.body, options).then((canvas) => {
      const image = canvas.toDataURL('image/png', 1.0);
      dispatch(addScreenshot(image));
      dispatch(hideLoader());
    });
  };

  const removeScreenshot = () => dispatch(addScreenshot(null));

  /* FORMIK */
  const validationSchema = Yup.object({
    files: Yup.mixed()
      .test('fileSize', 'File too large. Image max size is 25MB, video max size is 100MB', (files) => {
        if (files === null) {
          return true;
        }

        let result = true;

        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          result = SUPPORTED_IMAGE_FORMATS.includes(file.type) ? file.size <= IMAGE_MAX_FILE_SIZE : file.size <= VIDEO_MAX_FILE_SIZE;
        }

        return result;
      }),
  });

  const initialValues = {
    requestId,
    comment: '',
    files: null,
  };
  /* FORMIK */

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        if (values.comment === '' && values.files === null && screenshot === null) {
          alert('Please add comment or file or screenshot');
        } else {
          Promise.resolve(dispatch(addComment(values, screenshot))).then(() => {
            dispatch(addScreenshot(null));
            dispatch(fetchRequestComments(requestId));
            dispatch(fetchRequests());
            dispatch(fetchRequestsUpdates());
            actions.resetForm();
          });
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <TextField
            inputProps={{ style: { boxShadow: 'none', borderColor: 'white!important' } }}
            name="comment"
            label="Message"
            InputLabelProps={{ shrink: true }}
            multiline
            rows={4}
            variant="outlined"
            value={formikProps.values.comment}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            error={formikProps.touched.comment && Boolean(formikProps.errors.comment)}
            helperText={formikProps.touched.comment && formikProps.errors.comment}
            className={`${classes.width100} ${classes.mt10} ${classes.mb10}`}
          />
          <input
            accept="image/*,video/*"
            id="files"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(event) => {
              formikProps.setFieldValue('files', event.currentTarget.files);
            }}
          />
          <div className={classes.mobileViewNewRequestFlex}>
            <label htmlFor="files">
              <Button variant="contained" color="secondary" size="small" component="span" className={`${classes.blueSmallButton} ${classes.mobmt10}`}>
                Add files
                {' '}
                {formikProps.values?.files && formikProps.values.files.length}
              </Button>
            </label>

            <Button
              className={classes.blueSmallButton}
              variant="contained"
              color="secondary"
              size="small"
              onClick={makeScreenshot}
            >
              Make screenshot
            </Button>
          </div>

          <DarkGreenButton variant="contained" color="primary" type="submit" size="small" className={classes.flRight}>
            Send
          </DarkGreenButton>

          <p className={classes.red}>{formikProps.errors.files}</p>

          {screenshot && (
            <>
              <Button variant="contained" color="secondary" size="small" onClick={removeScreenshot} className={classes.pinkSmallButton}>
                Remove screenshot
              </Button>
              <img src={screenshot} style={{ maxWidth: '100%' }} />
            </>
          )}
        </form>
      )}
    </Formik>
  );
}
