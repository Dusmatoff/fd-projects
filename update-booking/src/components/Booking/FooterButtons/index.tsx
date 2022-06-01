import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Block from '@material-ui/icons/Block';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import Warning from '@material-ui/icons/Warning';
import Rating from '@material-ui/lab/Rating';
import { isContinueOverlapping, getContinueOverlappingMessage, getBookingStatus } from '../../../selectors';
import {
  GreenButton, GreyButton, BlueButton, RedButton, PinkButton,  CheckInButtonColor, ApproveButtonColor,
} from '../../buttons';
import { canDone } from '../../../utils';
import useStyles from '../../styles';

const FooterButtons = (props) => {
  const classes = useStyles();

  const {
    data, showContinueOverlapping, continueOverlappingMessage, deposit100, currentStatus,
  } = props;

  const {
    logAction,
    logNote,
    canceledReason,
    param1,
    param2,
    param3,
    status,
    trigger,
    fogMachine,
    videoLights,
    additionalCstands,
    additionalStrobes,
    checkInNotes,
    blacklist,
  } = data.values;

  const [openButtons, setOpenButtons] = React.useState(true);
  const [approveButtonContent, setApproveButtonContent] = React.useState(false);
  const [doneButtonContent, setDoneButtonContent] = React.useState(false);
  const [cancelButtonContent, setCancelButtonContent] = React.useState(false);
  const [noAnswerButtonContent, setNoAnswerButtonContent] = React.useState(false);
  const [checkInButtonContent, setCheckInButtonContent] = React.useState(status === 'checked in' || status === 'done');
  const [informed, setInformed] = React.useState(false);
  const [checkedDateTime, setCheckedDateTime] = React.useState(false);
  const [askedAboutHtcm, setAskedAboutHtcm] = React.useState(false);
  const [contractSigned, setContractSigned] = React.useState(false);
  const [bookingPaid, setBookingPaid] = React.useState(false);
  const [canceledReasonMessage, setCanceledReasonMessage] = React.useState('');
  const [logActionMessage, setLogActionMessage] = React.useState('');

  const showApproveBtn = (['pending', 'noanswer', 'cancelled'].indexOf(currentStatus) > -1);
  const showCancelBtn = (['pending', 'noanswer', 'approved'].indexOf(currentStatus) > -1);
  const showNoAnswerBtn = (['pending', 'cancelled'].indexOf(currentStatus) > -1);
  const showCheckInBtn = currentStatus === 'approved';
  const showDoneBtn = currentStatus === 'checked in';

  const handleClickOpen = () => {
    setOpenButtons(!openButtons);
    setApproveButtonContent(false);
    setDoneButtonContent(false);
    setCancelButtonContent(false);
    setNoAnswerButtonContent(false);
  };

  const handleClickApprove = () => {
    setApproveButtonContent(!approveButtonContent);
    setOpenButtons(!openButtons);
  };

  const handleClickDone = () => {
    setDoneButtonContent(!doneButtonContent);
    setOpenButtons(!openButtons);
  };

  const handleClickCancel = () => {
    setCancelButtonContent(!cancelButtonContent);
    setOpenButtons(!openButtons);
  };

  const handleClickNoAnswer = () => {
    setNoAnswerButtonContent(!noAnswerButtonContent);
    setOpenButtons(!openButtons);
  };

  const handleClickCheckIn = () => {
    setCheckInButtonContent(!checkInButtonContent);
    setOpenButtons(!openButtons);
  };

  const clickCheckInButton = (e) => {
    if (contractSigned && bookingPaid) {
      data.setFieldValue('submitButtonType', 'status_checked_in');
      data.handleSubmit(e);
      setOpenButtons(!openButtons);
    } else {
      alert('Please click checkboxes: Contract signed AND Booking paid');
    }
  };

  const clickApproveButton = (e) => {
    if (deposit100) {
      if (checkedDateTime && askedAboutHtcm && informed) {
        data.setFieldValue('submitButtonType', 'status_approve');
        data.handleSubmit(e);
      } else {
        alert('Please click checkboxes: Checked date&time AND Asked about HTCM & people in crew AND Informed/collected additional deposit');
      }
    } else if (checkedDateTime && askedAboutHtcm) {
      data.setFieldValue('submitButtonType', 'status_approve');
      data.handleSubmit(e);
    } else {
      alert('Please click checkboxes: Checked date&time AND Asked about HTCM & people in crew');
    }
  };

  const clickCancelButton = (e) => {
    if (canceledReason.length < 1 || canceledReason === 'default') {
      setCanceledReasonMessage('check Canceled reason');
    } else {
      data.setFieldValue('submitButtonType', 'status_cancelled');
      data.handleSubmit(e);
    }
  };

  const clickNoAnswerButton = (e) => {
    if (logAction.length < 1) {
      setLogActionMessage('check No Answer');
    } else {
      data.setFieldValue('submitButtonType', 'status_no_answer');
      data.handleSubmit(e);
    }
  };

  const TextForActions = () => (
    <Typography variant="caption" display="block" align="center" className={classes.red}>
      Booking will be saved & email sent to client
    </Typography>
  );

  return (
    <div>
      <Collapse in={approveButtonContent} timeout="auto">
        <div className={classes.textCenter}>
          {Boolean(deposit100)
                    && (
                    <FormControlLabel
                      className={classes.red}
                      control={(
                        <Checkbox
                          checked={informed}
                          onChange={() => setInformed(!informed)}
                          size="small"
                          color="primary"
                        />
)}
                      label="Informed/collected additional deposit"
                    />
                    )}
          <FormControlLabel
            control={(
              <Checkbox
                checked={checkedDateTime}
                onChange={() => setCheckedDateTime(!checkedDateTime)}
                size="small"
                color="primary"
              />
)}
            label="Checked date&time"
            className="whiteCheckbox"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={askedAboutHtcm}
                onChange={() => setAskedAboutHtcm(!askedAboutHtcm)}
                size="small"
                color="primary"
              />
)}
            label="Asked about HTCM & people in crew"
            className="whiteCheckbox"
          />
          <br />
          <ApproveButtonColor
            variant="contained"
            className={classes.margin}
            endIcon={<ThumbUpAlt />}
            onClick={clickApproveButton}
          >
            Approve
          </ApproveButtonColor>
          <GreyButton
            variant="contained"
            className={classes.margin}
            endIcon={<Clear />}
            onClick={handleClickOpen}
          >
            Exit
          </GreyButton>

          {showContinueOverlapping && (
          <div>
            <Typography
              variant="subtitle1"
              display="block"
              align="center"
              dangerouslySetInnerHTML={{ __html: continueOverlappingMessage }}
            />
            <BlueButton
              variant="contained"
              className={classes.margin}
              onClick={(e) => {
                data.setFieldValue('submitButtonType', 'continue_overlapping');
                data.handleSubmit(e);
              }}
            >
              Continue?
            </BlueButton>
          </div>
          )}
        </div>
        <TextForActions />
      </Collapse>
      <Collapse in={doneButtonContent} timeout="auto">
        <div className={classes.textCenter}>
          <Box component="div" mb={3} borderColor="transparent">
            <Typography component="span">Punctuality</Typography>
            <Rating
              name="param1"
              value={param1}
              onChange={data.handleChange}
              className={classes.ratingIcon}
              precision={0.1}
            />
            <Divider component="br" />
            <Typography variant="caption">on time checked-in & checked-out?</Typography>
          </Box>
          <Box component="div" mb={3} borderColor="transparent">
            <Typography component="span">Respectfulness</Typography>
            <Rating
              name="param2"
              value={param2}
              onChange={data.handleChange}
              className={classes.ratingIcon}
              precision={0.1}
            />
            <Divider component="br" />
            <Typography variant="caption">
              how easy it&apos;s to work with client, is he respectful to the studio and you?
            </Typography>
          </Box>
          <Box component="div" mb={3} borderColor="transparent">
            <Typography component="span">Cleanliness</Typography>
            <Rating
              name="param3"
              value={param3}
              onChange={data.handleChange}
              className={classes.ratingIcon}
              precision={0.1}
            />
            <Divider component="br" />
            <Typography variant="caption">
              studio clean? equipment in place?
            </Typography>
          </Box>
          <GreyButton
            variant="contained"
            className={classes.margin}
            endIcon={<Check />}
            onClick={(e) => {
              data.setFieldValue('submitButtonType', 'status_done');
              data.handleSubmit(e);
            }}
          >
            Done
          </GreyButton>
          <GreyButton
            variant="contained"
            className={classes.margin}
            endIcon={<Clear />}
            onClick={handleClickOpen}
          >
            Exit
          </GreyButton>
        </div>
        <TextForActions />
      </Collapse>
      <Collapse in={cancelButtonContent} timeout="auto">
        <div className={classes.textCenter}>
          <Box component="div" mb={3} borderColor="transparent">
            <FormControl variant="outlined">
              <InputLabel htmlFor="canceledReason">Reason</InputLabel>
              <Select
                name="canceledReason"
                native
                onChange={data.handleChange}
                label="Add action"
                inputProps={{
                  name: 'canceledReason',
                  id: 'canceledReason',
                }}
              >
                <option>---</option>
                <option value="no show">No show</option>
                <option value="schedule changed">Schedule Changed</option>
                <option value="no answer">No Answer / Can&apos;t Contact Him</option>
                <option value="time booked">Time is Booked Already</option>
                <option value="client canceled">Model/Client Canceled</option>
                <option value="expensive">Too Expensive / Don&apos;t like Prices</option>
                <option value="dont like">Doesn&apos;t like the Studio</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other - Specify in Admin Comment</option>
                <option value="didntwantdeposit">Didn`t want to put deposit</option>
                <option value="rebooked" className={classes.blackSelect}>
                  Rebooked / Wrong Date
                </option>
                <option value="duplicate" className={classes.blackSelect}>
                  Duplicate
                </option>
                <option value="created by mistake" className={classes.blackSelect}>
                  Created by mistake
                </option>
                <option value="moved to other booking" className={classes.blackSelect}>
                  Moved to other booking
                </option>
              </Select>
            </FormControl>
            <Typography align="center" color="secondary" variant="subtitle2" paragraph>
              {canceledReasonMessage}
            </Typography>
          </Box>
          <PinkButton
            variant="contained"
            className={classes.margin}
            endIcon={<Block />}
            onClick={clickCancelButton}
          >
            Cancel
          </PinkButton>
          <GreyButton
            variant="contained"
            className={classes.margin}
            endIcon={<Clear />}
            onClick={handleClickOpen}
          >
            Exit
          </GreyButton>
        </div>
        <TextForActions />
      </Collapse>
      <Collapse in={noAnswerButtonContent} timeout="auto">
        <div className={classes.textCenter}>
          <Box component="div" mb={3} borderColor="transparent">
            <FormControl variant="outlined">
              <InputLabel htmlFor="logAction">Add action</InputLabel>
              <Select
                name="logAction"
                native
                onChange={data.handleChange}
                label="Add action"
                inputProps={{
                  name: 'logAction',
                  id: 'logAction',
                }}
              >
                <option>---</option>
                <option value="Called">Called</option>
                <option value="Emailed">Emailed</option>
                <option value="Texted">Texted</option>
                <option value="Talked">Talked</option>
              </Select>
            </FormControl>
            <Typography align="center" color="secondary" variant="subtitle2" paragraph>
              {logActionMessage}
            </Typography>
            <br />
            <TextField
              name="logNote"
              label="Notes, can be empty"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={3}
              value={logNote}
              variant="outlined"
              onChange={data.handleChange}
              onBlur={data.handleBlur}
              error={data.touched.logNote && Boolean(data.errors.logNote)}
              helperText={data.touched.logNote && data.errors.logNote}
            />
          </Box>
          <RedButton
            variant="contained"
            className={classes.margin}
            endIcon={<Warning />}
            onClick={clickNoAnswerButton}
          >
            No Answer
          </RedButton>
          <GreyButton
            variant="contained"
            className={classes.margin}
            endIcon={<Clear />}
            onClick={handleClickOpen}
          >
            Exit
          </GreyButton>
        </div>
        <TextForActions />
      </Collapse>
      <Collapse in={openButtons} timeout="auto" unmountOnExit>
        <div className={classes.textCenter}>
          {blacklist
                    && (
                    <>
                      <Typography color="secondary" display="block" variant="h5">
                        Do not book list client!
                      </Typography>
                      <Typography variant="subtitle1">contact your manager for approval</Typography>
                    </>
                    )}
          <Grid spacing={1} justify="center" container>
            {!blacklist && showApproveBtn && (
            <Grid item xs={6} xl={3}>
              <ApproveButtonColor
                variant="contained"
                endIcon={<ArrowDropUp className={classes.dropIcon} />}
                onClick={handleClickApprove}
                className={classes.flowBtn}
                fullWidth
              >
                Approve
              </ApproveButtonColor>
            </Grid>
            )}

            {showDoneBtn && (
              <Grid item xs={6} xl={3}>
                <GreyButton
                  variant="contained"
                  endIcon={<ArrowDropUp className={classes.dropIcon} />}
                  onClick={handleClickDone}
                  className={classes.flowBtn}
                  disabled={!canDone(data.values.date)}
                  fullWidth
                >
                  Done
                </GreyButton>
              </Grid>
            )}

            {showCancelBtn && (
              <Grid item xs={6} xl={3}>
                <PinkButton
                  variant="contained"
                  endIcon={<ArrowDropUp className={classes.dropIcon} />}
                  onClick={handleClickCancel}
                  className={classes.flowBtn}
                  fullWidth
                >
                  Cancel
                </PinkButton>
              </Grid>
            )}

            {!blacklist && showNoAnswerBtn
                        && (
                        <Grid item xs={6} xl={3}>
                          <RedButton
                            variant="contained"
                            endIcon={<ArrowDropUp className={classes.dropIcon} />}
                            onClick={handleClickNoAnswer}
                            className={classes.flowBtn}
                            fullWidth
                          >
                            No Answer
                          </RedButton>
                        </Grid>
                        )}

            {status === 'approved' && showCheckInBtn
                        && (
                        <Grid item xs={6} xl={3}>
                          <CheckInButtonColor
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowDropUp className={classes.dropIcon} />}
                            onClick={handleClickCheckIn}
                            className={classes.flowBtn}
                            fullWidth
                          >
                            Check in
                          </CheckInButtonColor>
                        </Grid>
                        )}
          </Grid>
        </div>
      </Collapse>
      <Collapse in={checkInButtonContent} timeout="auto">
        <div className={classes.textCenter}>
          {(status !== 'checked in' && status !== 'done')
                    && (
                    <div>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={contractSigned}
                            onChange={() => setContractSigned(!contractSigned)}
                            size="small"
                            color="primary"
                          />
)}
                        label="Contract signed"
                        className="whiteCheckbox"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={bookingPaid}
                            onChange={() => setBookingPaid(!bookingPaid)}
                            size="small"
                            color="primary"
                          />
)}
                        label="Booking paid"
                        className="whiteCheckbox"
                      />
                    </div>
                    )}
          <Divider component="br" />
          <Typography variant="h5">Equipment used</Typography>
          <Divider component="br" />
          <FormControlLabel
            control={(
              <Checkbox
                checked={trigger}
                onChange={data.handleChange}
                name="trigger"
                size="small"
                color="primary"
              />
)}
            label="trigger"
            className="whiteCheckbox"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={fogMachine}
                onChange={data.handleChange}
                name="fogMachine"
                size="small"
                color="primary"
              />
)}
            label="fog machine"
            className="whiteCheckbox"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={videoLights}
                onChange={data.handleChange}
                name="videoLights"
                size="small"
                color="primary"
              />
)}
            label="video lights"
            className="whiteCheckbox"
          />
          <Divider component="br" />
          <TextField
            className={classes.margin}
            name="additionalCstands"
            label="additional c stands"
            InputLabelProps={{ shrink: true }}
            value={additionalCstands || ''}
            type="number"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.additionalCstands && Boolean(data.errors.additionalCstands)}
            helperText={data.touched.additionalCstands && data.errors.additionalCstands}
          />
          <TextField
            className={classes.margin}
            name="additionalStrobes"
            label="additional strobes"
            InputLabelProps={{ shrink: true }}
            value={additionalStrobes || ''}
            type="number"
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.additionalStrobes && Boolean(data.errors.additionalStrobes)}
            helperText={data.touched.additionalStrobes && data.errors.additionalStrobes}
          />
          <Divider component="br" />
          <TextField
            className={`${classes.width100} ${classes.mt10} ${classes.mb10}`}
            name="checkInNotes"
            label="Additional Notes"
            InputLabelProps={{ shrink: true }}
            multiline
            rows={3}
            variant="outlined"
            value={checkInNotes}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={data.touched.checkInNotes && Boolean(data.errors.checkInNotes)}
            helperText={data.touched.checkInNotes && data.errors.checkInNotes}
          />
          {(status !== 'checked in' && status !== 'done')
                    && (
                    <div>
                      <CheckInButtonColor
                        variant="contained"
                        className={classes.margin}
                        endIcon={<Check />}
                        onClick={clickCheckInButton}
                      >
                        Check in
                      </CheckInButtonColor>
                      <GreyButton
                        variant="contained"
                        className={classes.margin}
                        endIcon={<Clear />}
                        onClick={handleClickCheckIn}
                      >
                        Exit
                      </GreyButton>
                    </div>
                    )}
        </div>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showContinueOverlapping: isContinueOverlapping(state),
  continueOverlappingMessage: getContinueOverlappingMessage(state),
  currentStatus: getBookingStatus(state),
});

export default connect(mapStateToProps, null)(FooterButtons);
