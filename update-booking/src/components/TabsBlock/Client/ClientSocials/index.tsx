import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import useStyles from '../../../styles';

const ClientSocials = (props) => {
  const classes = useStyles();

  const { data } = props;
  const {
    facebook, youtube, twitter, instagram, snapchat,
  } = data.values;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!data.isValid) {
      data.setFieldValue('facebook', data.initialValues.facebook);
      data.setFieldValue('youtube', data.initialValues.youtube);
      data.setFieldValue('twitter', data.initialValues.twitter);
      data.setFieldValue('instagram', data.initialValues.instagram);
      data.setFieldValue('snapchat', data.initialValues.snapchat);
    }

    setOpen(false);
  };

  const saveSocials = (e) => {
    if (data.isValid) {
      data.setFieldValue('submitButtonType', 'save_socials');
      data.handleSubmit(e);
    }

    handleClose();
  };

  return (
    <>
      {facebook
            && (
            <a href={`http://facebook.com/${facebook}`} target="_blank" className={classes.socialItem} rel="noreferrer">
              <i className="fa fa-facebook fa-2x" />
              {' '}
              {facebook}
            </a>
            )}
      {youtube
            && (
            <a href={`http://youtube.com/${youtube}`} target="_blank" className={classes.socialItem} rel="noreferrer">
              <i className="fa fa-youtube fa-2x" />
              {' '}
              {youtube}
            </a>
            )}
      {twitter
            && (
            <a href={`http://twitter.com/${twitter}`} target="_blank" className={classes.socialItem} rel="noreferrer">
              <i className="fa fa-twitter fa-2x" />
              {' '}
              {twitter}
            </a>
            )}
      {instagram
            && (
            <a href={`http://instagram.com/${instagram}`} target="_blank" className={classes.socialItem} rel="noreferrer">
              <i className="fa fa-instagram fa-2x" />
              {' '}
              {instagram}
            </a>
            )}
      {snapchat
            && (
            <a href={`http://snapchat.com/${snapchat}`} target="_blank" className={classes.socialItem} rel="noreferrer">
              <i className="fa fa-snapchat fa-2x" />
              {' '}
              {snapchat}
            </a>
            )}

      <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
        Edit socials
      </Button>
      <br />

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="customized-dialog-title">
          <Typography variant="h6">Edit socials</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.padding}>
          <TextField
            className={classes.margin}
            name="facebook"
            value={facebook}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.facebook && Boolean(data.errors.facebook)}
            helperText={data.touched.facebook && data.errors.facebook}
            InputProps={{ startAdornment: (<i className="fa fa-facebook" />) }}
          />
          <br />
          <TextField
            className={classes.margin}
            name="youtube"
            value={youtube}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.youtube && Boolean(data.errors.youtube)}
            helperText={data.touched.youtube && data.errors.youtube}
            InputProps={{ startAdornment: (<i className="fa fa-youtube" />) }}
          />
          <br />
          <TextField
            className={classes.margin}
            name="twitter"
            value={twitter}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.twitter && Boolean(data.errors.twitter)}
            helperText={data.touched.twitter && data.errors.twitter}
            InputProps={{ startAdornment: (<i className="fa fa-twitter" />) }}
          />
          <br />
          <TextField
            className={classes.margin}
            name="instagram"
            value={instagram}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.instagram && Boolean(data.errors.instagram)}
            helperText={data.touched.instagram && data.errors.instagram}
            InputProps={{ startAdornment: (<i className="fa fa-instagram" />) }}
          />
          <br />
          <TextField
            className={classes.margin}
            name="snapchat"
            value={snapchat}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.snapchat && Boolean(data.errors.snapchat)}
            helperText={data.touched.snapchat && data.errors.snapchat}
            InputProps={{ startAdornment: (<i className="fa fa-snapchat" />) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveSocials} variant="contained" color="primary" size="medium">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientSocials;
