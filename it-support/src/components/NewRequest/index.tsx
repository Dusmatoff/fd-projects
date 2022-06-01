import React from 'react';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DarkGreenButton } from '../buttons';
import {
  addScreenshot, hideNewRequest, showLoader, hideLoader,
} from '../../store/actions/app';
import { addRequest, fetchRequestsUpdates } from '../../store/actions/requests';
import { getScreenshot, isShowNewRequest } from '../../store/selectors';
import {
  SUPPORTED_IMAGE_FORMATS, IMAGE_MAX_FILE_SIZE, VIDEO_MAX_FILE_SIZE,
} from '../../utils';
import useStyles from '../styles';

export default function NewRequest() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const showForm = useSelector((state) => isShowNewRequest(state));
  const screenshot = useSelector((state) => getScreenshot(state));

  const handleClose = () => {
    dispatch(hideNewRequest());
    dispatch(addScreenshot(null));
  };

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

  /* FORMIK */
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
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
    title: '',
    description: '',
    files: null,
  };
    /* FORMIK */

  const removeScreenshot = () => dispatch(addScreenshot(null));

  return (
    <Dialog maxWidth="sm" onClose={handleClose} open={showForm} data-html2canvas-ignore="true" classes={{ container: classes.baseline }}>
      <MuiDialogTitle disableTypography className={`${classes.root} ${classes.titleNewRequest}`}>
        <Typography variant="h6">New Request</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} style={{ position: 'absolute' }}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            Promise.resolve(dispatch(addRequest(values, screenshot))).then(() => {
              dispatch(fetchRequestsUpdates());
            }).then(() => {
              handleClose();
            });
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <TextField
                name="title"
                label="Title"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                error={formikProps.touched.title && Boolean(formikProps.errors.title)}
                helperText={formikProps.touched.title && formikProps.errors.title}
                className={`${classes.width100} ${classes.mb10}`}
                value={formikProps.values.title}
                inputProps={{
                  style: {
                    boxShadow: 'none', borderColor: 'white!important', fontSize: '16px', color: 'black',
                  },
                }}
              />
              <br />
              <TextField
                name="description"
                label="Description"
                inputProps={{ style: { boxShadow: 'none', borderColor: 'white!important' } }}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
                variant="outlined"
                value={formikProps.values.description}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                error={formikProps.touched.description && Boolean(formikProps.errors.description)}
                helperText={formikProps.touched.description && formikProps.errors.description}
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
                  <Button variant="contained" component="span" className={`${classes.blueSmallButton} ${classes.mobmt10}`}>
                    Add files
                    {' '}
                    {formikProps.values?.files && formikProps.values.files.length}
                  </Button>
                </label>

                <Button
                  className={classes.blueSmallButton}
                  variant="contained"

                  onClick={makeScreenshot}
                >
                  Make screenshot
                </Button>
              </div>
              <DarkGreenButton variant="contained" color="primary" type="submit" size="small" className={classes.flRight}>
                Add request
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
      </MuiDialogContent>
    </Dialog>
  );
}
