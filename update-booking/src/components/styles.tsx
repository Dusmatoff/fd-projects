import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    border: 1,
    backgroundColor: theme.palette.background.paper,
  },
  border: {
    border: '1px solid #757575',
    borderBottom: '1px solid #757575!important',
  },
  padding: {
    padding: theme.spacing(1),
  },
  margin: {
    margin: '8px!important',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  blockGridCenter: {
    '@media (max-width:1220px)': {
      textAlign: 'center',
    },
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
  blackSelect: {
    color: '#f2f2f2',
    backgroundColor: '#636363!important',
  },
  popover: {
    pointerEvents: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'block',
    margin: '0 auto',
    position: 'relative',
    '@media (max-width:1680px)': {
      width: '115px',
      height: '115px',
    },
    '@media (max-width:1480px)': {
      width: '100px',
      height: '100px',
    },
  },
  mb10: {
    marginBottom: '10px!important',
  },
  mb15: {
    marginBottom: '15px!important',
  },
  mbMinus20: {
    marginBottom: '-20px',
  },
  mtMinus10: {
    marginTop: '-10px',
  },
  mt5: {
    marginTop: '5px!important',
  },
  mt10: {
    marginTop: '10px!important',
  },
  mr20: {
    marginRight: '20px!important',
  },
  mr50: {
    marginRight: '50px!important',
  },
  ml0: {
    marginLeft: '0!important',
  },
  ml5: {
    marginLeft: '5px!important',
  },
  ml20: {
    marginLeft: '20px!important',
  },
  mr0: {
    marginRight: '0!important',
  },
  mar0: {
    margin: '0!important',
  },
  pd0: {
    padding: '0!important',
  },
  pd3: {
    padding: '3px!important',
  },
  pd5: {
    padding: '5px!important',
  },
  pd7: {
    padding: '7px!important',
  },
  pd10: {
    padding: '10px!important',
  },
  pdB10: {
    paddingBottom: '10px!important',
  },
  pd15: {
    padding: '15px!important',
  },
  pdL5: {
    paddingLeft: '5px!important',
  },
  pdL15: {
    paddingLeft: '15px!important',
  },
  pdR15: {
    paddingRight: '15px!important',
  },
  pdR5: {
    paddingRight: '5px!important',
  },
  pdT5: {
    paddingTop: '5px!important',
  },
  pdT10: {
    paddingTop: '10px',
  },
  paddingZero: {
    padding: '0!important',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  dNone: {
    display: 'none',
  },
  dBlock: {
    display: 'block!important',
  },
  photoIcon: {
    position: 'absolute',
    top: '22%',
    left: '26%',
  },
  photoIconDelete: {
    position: 'absolute',
    top: '67%',
    left: '36%',
  },
  lineBreakAnywhere: {
    lineBreak: 'anywhere',
  },
  transactionBtn: {
    padding: '0 10px',
    fontSize: '12px',
    minWidth: 'auto',
    textTransform: 'none',
    margin: '5px',
  },
  width100: {
    width: '100%',
    maxWidth: '100%',
  },
  orderItemsTable: {
    maxWidth: 300,
    margin: '0 auto',
  },
  whiteButton: {
    background: '#fff',
    border: '1px solid',
  },
  bookingBlock: {
    marginRight: 5,
    marginTop: 5,
    border: '3px solid #AEE37D',
    padding: 10,
  },
  border2: {
    border: '3px solid #646464',
  },
  clientBorder: {
    border: '3px solid #12AC3F',
  },
  boldInput: {
    fontWeight: 500,
    '& div': {
      fontWeight: 500,
    },
  },
  numberField: {
    '& div': {
      height: 35,
      '@media (max-width:1220px)': {
        height: '31px',
      },
    },
  },
  blueTd: {
    backgroundColor: '#52B9F3',
    color: '#fff!important',
    fontSize: '1.2rem!important',
    fontWeight: 700,
    '@media (max-width:1680px)': {
      fontSize: '1rem!important',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.8rem!important',
    },
  },
  noAgreement: {
    backgroundColor: '#F2C9CA',
  },
  statusBckg: {
    fontSize: '0.875rem',
    '@media (max-width:1680px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.75rem',
    },

    '&.approved': {
      backgroundColor: '#B0E57D',
    },
    '&.pending': {
      backgroundColor: '#FFEC94',
    },
    '&.noanswer': {
      backgroundColor: '#FE413E',
      color: '#f9b7b7',
    },
  },
  textUnderline: {
    textDecoration: 'underline',
  },
  bookingStatistic: {
    right: '0.6rem',
    top: '0.3rem',
  },
  borderOneGray: {
    border: '1px solid #DADADA',
  },
  noteClear: {
    background: '#E1E2E6',
  },
  upcomingBookingTable: {
    // maxHeight: 200,
    '& td': {
      borderBottom: '1px solid #fff',
      paddingTop: '3px!important',
      paddingBottom: '3px!important',
    },
  },
  emailField: {
    '& div': {
      width: 230,
    },
  },
  textBlack: {
    color: '#000!important',
  },
  noWordSpace: {
    '@media (min-width:1220px)': {
      wordSpacing: '-4px!important',
    },
  },
  bgPink: {
    backgroundColor: '#F2C9CA!important',
    '& .fd-booking-MuiTab-wrapper': {
      color: '#494949',
    },
  },
  dateInput: {
    '& input': {
      padding: '4px 10px!important',
      fontSize: '1rem',
      textAlign: 'center',
    },

  },
  height70: {
    height: 70,
  },
  height80: {
    height: 80,
  },
  pinkSelect: {
    '& select': {
      backgroundColor: '#F2C9CA!important',
    },
  },
  centerBtn: {
    margin: '0 auto',
    display: 'flex',
  },
  fontWeight500: {
    fontWeight: 500,
  },
  borderInput: {
    '&:before': {
      borderBottom: '1px solid #949494!important',
    },
    '& div:before': {
      borderBottom: '1px solid #949494!important',
    },
  },
  crewSize: {
    maxWidth: 80,
    '& div': {
      '& input': {
        textAlign: 'center',
      },
    },
  },
  width85: {
    maxWidth: 85,
  },
  lineHeight1: {
    lineHeight: 1,
  },
  textLowercase: {
    textTransform: 'lowercase',
  },
  socialItem: {
    fontSize: 15,
    display: 'block',
  },
  inputPadding0: {
    '& div': {
      '& input': {
        padding: '0!important',
      },
    },
  },
  dInherit: {
    display: 'inherit',
  },
  boldLabel: {
    '& .fd-booking-MuiFormControlLabel-label': {
      fontWeight: 700,
    },
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studioSelect: {
    '& .fd-booking-MuiInputBase-root': {
      maxWidth: 200,
    },
  },
  sendEmailIcon: {
    padding: '0 0 3px',
  },
  flowBtn: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  dropIcon: {
    marginLeft: '-8px',
  },
  deletedPackage: {
    background: '#ff6f6f',
    opacity: '0.7',
  },
  currentRateBg: {
    backgroundColor: '#B0E57C!important',
  },
  noteHeader: {
    textAlign: 'center',
    margin: '0',
  },
  noteBlock: {
    marginBottom: '4px',
    padding: '3px',
  },
  noteRemove: {
    padding: '0px',
    marginLeft: '2px',
  },
  noteContent: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  textAreaAutosizeLabel: {
    padding: '0px 4px!important',
    top: '10px!important',
  },
  textAreaAutosizeWrap: {
    position: 'relative',
  },
  textAreaAutosize: {
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.23) !important',
    '&$hasError': {
      borderColor: 'red !important',
    },
  },
  errorText: {
    display: 'none',
    padding: '0px 6px',
    margin: '0px',
    '&$hasError': {
      display: 'block',
      color: 'red',
    },
  },
  hasError: {
    color: 'red',
  },
  prefNote: {
    background: '#d9edf7',
    color: '#31708f',
  },
  warningNote: {
    background: '#ff6f6f',
  },
  tabLabel: {
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    '@media (max-width:1680px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.7rem',
    },
  },
  bigInput: {
    '& div': {
      fontSize: '1.1rem',
      fontWeight: 700,
      '@media (max-width:1680px)': {
        fontSize: '1rem',
      },
      '@media (max-width:1480px)': {
        fontSize: '1rem',
      },
    },
  },
  dateInputBirthday: {
    '& input': {
      padding: '4px 10px!important',
      margin: '-2px',
      '@media (max-width:1680px)': {
        width: '51px',
      },
      '@media (max-width:1480px)': {
        width: '47px',
      },
    },
  },
  input18px: {
    '& input': {
      fontSize: '1rem',
      padding: '0px 10px!important',
      '@media (max-width:1680px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width:1480px)': {
        fontSize: '0.8rem',
      },
    },
  },
  fontSize14: {
    fontSize: '14px!important',
  },
  fontSize15: {
    fontSize: '1rem',
    '@media (max-width:1680px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.8rem',
    },
  },
  inlineIcon: {
    marginBottom: '-5px!important',
    '@media (max-width:1680px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1.1rem',
    },
  },
  iconMail: {
    cursor: 'pointer',
    padding: '0px',
    marginLeft: '-16px',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  ratingIcon: {
    fontSize: '1.5rem',
    '@media (max-width:1680px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '1.1rem',
    },
  },
  dateBooking: {
    fontSize: '0.875rem',
    '@media (max-width:1680px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width:1480px)': {
      fontSize: '0.75rem',
    },
  },
  agreementPadding: {
    padding: '5px',
    '@media (max-width:1680px)': {
      padding: '4px',
    },
    '@media (max-width:1604px)': {
      padding: '3px',
    },
  },

  cardPadding: {
    padding: '6px!important',
  },
  floatR: {
    float: 'right',
  },
  paddingClientInfo: {
    '@media (max-width:1220px)': {
      paddingTop: '5px',
    },
  },
  deleteInfo: {
    fontSize: '0.7em',
    background: 'white',
    borderRadius: '5px',
    textAlign: 'center',
    margin: '2px 0px',
    padding: '1px',
  },
  borderRight: {
    borderRight: '2px solid #DADADA',
    '@media (max-width:1220px)': {
      borderBottom: '2px solid #DADADA',
      borderRight: 'none',
    },
  },
  modalSize: {
    width:'86em',
    height: '70vh',
    '@media (max-width:1220px)': {
      width:'50em',
    },
    '@media (max-width:768px)': {
      width:'100%',
    },
  },

  cartButton: {
    right: '50px',
    '@media (max-width:1219px)': {
      top: '52px',
      position: 'absolute',
    },
    '@media (max-width:600px)': {
      top: '99px',
    },
  },
  dialogWindow: {
    '@media (min-width:960px)': {
      marginLeft: '151px',
    },
  },
  pdContent: {
    '@media (max-width:544px)': {
      padding: '8px 3px',
    },
  },
  widthColumn: {
    '@media (max-width:456px)': {
      width: '10px',
    },
  },
  cartBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  dFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  Flex: {
    display: 'flex',
  },
  flexNoWrap: {
    flexWrap: 'nowrap',
  },
  width200: {
    '@media (max-width:1220px)': {
      maxWidth: '200px',
    },
  },
  dateHeight: {
    '@media (max-width:1220px)': {
      height: '30px',
    },
  },
  fontSize1rem: {
    '@media (max-width:1220px)': {
      fontSize: '1rem',
    },
  },
  fontSize085rem: {
    fontSize: '0.85rem',
  },
  paddingPackages: {
    padding: '4px 4px 4px!important',
  },
  fontSizePackages: {
    fontSize: '0.8rem',
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  inputBoxPhone: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.5rem',
    overflow: 'hidden',
    fontWeight: 500,
    marginTop: 10,
    borderBottom: '1px solid',
    width: '100%',
    fontSize: 14,
  },
  phoneInput: {
    background: 'transparent',
    border: 'none',
    width: '100%',
  },
}));

export default useStyles;
