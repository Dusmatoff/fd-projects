import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

export const GreenButton = withStyles(() => ({
  root: {
    backgroundColor: '#38AF53',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#389453',
    },
  },
}))(Button);

export const GreyButton = withStyles(() => ({
  root: {
    backgroundColor: '#E0E0E0',
    '&:hover': {
      backgroundColor: '#C4C4C4',
    },
  },
}))(Button);

export const BlueButton = withStyles(() => ({
  root: {
    color: '#fff',
    backgroundColor: '#4AA0D7',
    '&:hover': {
      backgroundColor: '#4096CD',
    },
  },
}))(Button);

export const RedButton = withStyles(() => ({
  root: {
    backgroundColor: '#FD3D3F',
    '&:hover': {
      backgroundColor: '#FF5E60',
    },
  },
}))(Button);

export const PinkButton = withStyles(() => ({
  root: {
    backgroundColor: '#E2ACAC',
    '&:hover': {
      backgroundColor: '#C79191',
    },
  },
}))(Button);

export const WhiteButton = withStyles(() => ({
  root: {
    border: '1px solid',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}))(Button);
export const ApproveButtonColor = withStyles(() => ({
  root: {
    backgroundColor: '#afe37e',
    '&:hover': {
      backgroundColor: '#9fcd73',
    },
  },
}))(Button);
export const CheckInButtonColor = withStyles(() => ({
  root: {
    backgroundColor: '#74E9FD',
    '&:hover': {
      backgroundColor: '#71dff1',
    },
  },
}))(Button);
