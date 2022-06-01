import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  itemsTable: {
    maxWidth: 700,
    display: 'block',
    margin: '0 auto',
  },
  flex: {
    display: 'flex!important',
    flexDirection: 'row',
    alignItems: 'flex-end!important',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  ml15: {
    marginLeft: 15,
  },
  mr15: {
    marginRight: 15,
  },
  mgb15: {
    marginBottom: '15px!important',
  },
  textField: {
    '& input': {
      padding: '14px!important',
    },
  },
  width100: {
    width: '100%',
  },
  height35: {
    height: 35,
  },
  borderInput: {
    '&:before': {
      borderBottom: '1px solid #949494!important',
    },
    '& div:before': {
      borderBottom: '1px solid #949494!important',
    },
  },
  boldInput: {
    fontWeight: 500,
    '& div': {
      fontWeight: 500,
    },
  },
  fontSize1rem: {
    '@media (max-width:1220px)': {
      fontSize: '1rem',
    },
  },
  chart600: {
    maxHeight: 600,
    marginTop: 70,
  },
  diff: {
    color: '#4488a0',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  stickyCell: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800,
  },
  minWidth55: {
    minWidth: 55,
  },
  margin2: {
    margin: theme.spacing(2),
  },
  inputBoxPhone: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.5rem',
    overflow: 'hidden',
    fontWeight: 500,
    marginTop: 10,
    borderBottom: '1px solid',
    width: '98%',
    fontSize: 14,
  },
  phoneInput: {
    background: 'transparent',
    border: 'none',
    width: '100%',
  },
  red: {
    color: 'red',
  },
  bgRed: {
    backgroundColor: '#F4CCCC',
  },
  border1Solid: {
    border: '1px solid',
  },
}));

export default useStyles;
