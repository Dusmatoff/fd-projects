import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  width100: {
    width: '100%',
  },
  margin2: {
    margin: '16px!important',
  },
  numberField: {
    '& div': {
      height: 35,
    },
  },
  mgt15: {
    marginTop: 15,
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
  flex: {
    display: 'flex!important',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dBlock: {
    display: 'block',
  },
  backgroundHeader: {
    backgroundColor: '#e6f3ff',
    color: '#153244',
  },
}));

export default useStyles;
