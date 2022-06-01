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
  ml15: {
    marginLeft: 15,
  },
  mr15: {
    marginRight: 15,
  },
  mgb15: {
    marginBottom: '15px!important',
  },
  numberField: {
    '& div': {
      height: 35,
    },
    '& svg': {
      display: 'none',
    },
  },
  width100: {
    width: '100%',
  },
  height35: {
    height: 35,
  },
  backgroundHeader: {
    backgroundColor: '#e6f3ff',
    color: '#153244',
  },
  GreenButton: {
    color: '#fff',
    backgroundColor: '#afe37e',
    '&:hover': {
      backgroundColor: '#9fcd73',
    },
  },
}));

export default useStyles;
