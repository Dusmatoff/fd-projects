import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
import Settings from '@material-ui/icons/Settings';
import FileCopy from '@material-ui/icons/FileCopy';
import useStyles from '../../styles';
import { BlueButton, WhiteButton } from '../../buttons';

const HeaderButtons = (props) => {
  const classes = useStyles();

  const { data } = props;

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={0} justify="space-between" alignItems="center">
      <Grid item xs={9} className={classes.Flex}>
        <WhiteButton
          href="?page=appointment-calendar"
          variant="contained"
          className={`${classes.whiteButton} ${classes.mr20}`}
          size="large"
          endIcon={<Replay fontSize="small" />}
        >
          Exit
        </WhiteButton>
        <WhiteButton
          variant="contained"
          size="large"
          className={`${classes.whiteButton} ${classes.mr20}`}
          endIcon={<FileCopy fontSize="small" />}
          onClick={(e) => {
            data.setFieldValue('submitButtonType', 'copy_booking');
            handleClose();
            data.handleSubmit(e);
          }}
        >
          Copy
        </WhiteButton>
        <BlueButton
          variant="contained"
          size="large"
          endIcon={<Save fontSize="small" />}
          onClick={(e) => {
            data.setFieldValue('submitButtonType', 'save_booking');
            handleClose();
            data.handleSubmit(e);
          }}
        >
          Save
        </BlueButton>

      </Grid>
      <Grid item xs={3}>
        <div className={classes.textRight}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Settings />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '25ch',
                marginLeft: '40px',
              },
            }}
          >
            <MenuItem
              onClick={(e) => {
                data.setFieldValue('submitButtonType', 'create_new_client');
                handleClose();
                data.handleSubmit(e);
              }}
            >
              Create new client
            </MenuItem>
            <MenuItem disabled>
              Create callsheet
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                data.setFieldValue('submitButtonType', 'delete');
                handleClose();
                data.handleSubmit(e);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
};

export default HeaderButtons;
