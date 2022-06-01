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
    position: 'fixed',
  },
  modalRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0),
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
    marginTop: '10px!important',
  },
  mb10: {
    marginBottom: '10px!important',
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
  width80: {
    width: '80%',
  },
  height35: {
    height: 35,
  },
  borderRight1: {
    borderRight: '1px solid #000',
  },
  pd5: {
    padding: '3px!important',
  },
  pd0: {
    padding: '0!important',
  },
  pdt5: {
    paddingTop: '5px!important',
  },
  pdb5: {
    paddingBottom: '5px!important',
  },
  pdt15: {
    paddingTop: '15px!important',
  },
  pl15: {
    paddingLeft: 15,
  },
  mrb15: {
    marginBottom: '-15px',
  },
  pr15: {
    paddingRight: 15,
  },
  flRight: {
    float: 'right',
  },
  commentBlock: {
    border: '1px solid',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 16,
  },
  descriptionFont: {
    fontSize: '1.2rem!important',
    '@media (max-width:768px)': {
      fontSize: '1rem!important',
      padding: '1px!important',
      lineHeight: '1!important',
      minHeight: '38px!important',
    },
  },
  descriptionHeight: {
    lineHeight: 1,
    margin: '6px 0px',
  },
  red: {
    color: '#F50057',
  },
  baseline: {
    alignItems: 'baseline!important',
    '@media (max-width:768px)': {
      paddingTop: '20px!important',
    },
  },
  founderTime: {
    fontSize: '0.7rem',
    color: 'grey',
    marginTop: '-9px',
  },
  commentTime: {
    fontSize: '0.7rem',
    color: 'grey',
    display: 'block',
    textAlign: 'right',
    marginTop: '-17px',
    marginBottom: '-7px',
  },
  titleNewRequest: {
    textAlign: 'center',
    padding: '5px!important',
    backgroundColor: '#f1f1f1',
  },
  backgroundHeader: {
    backgroundColor: '#e6f3ff',
    color: '#153244',
    minHeight: '40px!important',
    height: '43px',
    '@media (max-width:768px)': {
      height: 'auto',
    },
  },
  listItemsAdmin: {
    padding: 0,
    backgroundColor: '#32373c',
    color: '#b4b9be',

  },
  listItem: {
    '&:hover': {
      color: '#00b9eb',
    },
  },
  borderInput: {
    border: 'none!important',
    boxShadow: 'none',
  },
  updateCounter: {
    backgroundColor: '#ca4a1f',
    borderRadius: '20px!important',
    marginLeft: '5px!important',
    padding: '0 5px!important',
    fontSize: '10px!important',
    minWidth: 14,
    lineHeight: 2,
  },
  modalContent: {
    padding: '0px!important',
    overflow: 'auto',
    maxHeight: '85vh',
  },
  blueSmallButton: {
    fontSize: '0.6rem!important',
    padding: '2px 5px!important',
    marginRight: '15px!important',
    color: '#fff!important',
    backgroundColor: '#4AA0D7!important',
    '&:hover': {
      backgroundColor: '#4096CD!important',
    },
  },
  pinkSmallButton: {
    fontSize: '0.6rem',
    padding: '2px 5px',
    marginRight: 15,
    color: '#fff',
    backgroundColor: '#E2ACAC',
    '&:hover': {
      backgroundColor: '#C79191',
    },
  },
  mrtitle: {
    margin: '18px 0px 6px 0px',
  },
  supportTable: {
    '& tbody': {
      '& td': {
        '@media (max-width:768px)': {
          padding: '3px!important',
          width: 'auto!important',
        },
      },
      '& tr': {
        '@media (max-width:768px)': {
          padding: '3px!important',
          width: 'auto!important',
        },
      },
    },
    '& thead': {
      // display: 'none',
      '& th:nth-child(1)': {
        width: '15%!important',
        '@media (max-width:768px)': {
          padding: '3px!important',
          width: 'auto!important',
        },
      },
      '& th:nth-child(2)': {
        width: '50%!important',
        '@media (max-width:768px)': {
          padding: '3px!important',
          width: 'auto!important',
        },
      },
      '& th:nth-child(3)': {
        width: '15%!important',
        '@media (max-width:768px)': {
          padding: '3px!important',
          width: 'auto!important',
        },
      },
    },
  },
  adminView: {
    left: '150px!important',
    '@media (max-width:960px)': {
      left: '10px!important',
    },
    '@media (max-width:782px)': {
      left: '0px!important',
    },
  },
  mobileViewNewRequest: {
    '@media (max-width:768px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  mobileViewNewRequestFlex: {
    display: 'inline-block',
    '@media (max-width:768px)': {
      display: 'inline-grid',
    },
  },
  mobmt10: {
    '@media (max-width:768px)': {
      marginBottom: '10px',
    },
  },
  mobcolumn: {
    '@media (max-width:600px)': {
      flexDirection: 'column-reverse',
    },
  },
}));

export default useStyles;
