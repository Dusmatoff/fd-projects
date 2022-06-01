import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import NoteItem from './noteItem';
import { getClient } from '../../../../selectors';
import { fetchClient, addClientNote, deleteClientNote } from '../../../../actions/client';
import { WhiteButton, BlueButton, GreenButton } from '../../../buttons';
import useStyles from '../../../styles';

const ClientNotes = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const client = useSelector((state) => getClient(state));

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const notes = client?.notes;
  const { current_user_can_delete: canDelete, current_user_id: userId } = client;

  const [showDeletedNotes, setShowDeletedNotes] = React.useState(false);

  /* FORMIK */
  const validationSchema = Yup.object({
    clientNoteText: Yup.string().required().max(1000),
  });

  const initialValues = {
    clientId: client.id,
    clientNoteText: '',
    clientNoteType: '3',
  };
  /* FORMIK */

  const deleteNote = (id) => {
    Promise.resolve(dispatch(deleteClientNote(id))).then(() => {
      dispatch(fetchClient(client.id, client.app_id));
    });
  };

  let notesList;
  let deletedList;

  if (notes) {
    notesList = notes.map((note) => (
      <>
        {note.type !== '4'
          && (
          <NoteItem
            note={note}
            currentUserCanDelete={canDelete}
            currentUserId={userId}
            deleteNote={deleteNote}
            isDeleted={false}
          />
          )}
      </>
    ));

    deletedList = notes.map((note) => (
      <>
        {note.type === '4'
          && (
          <NoteItem
            note={note}
            currentUserCanDelete={canDelete}
            currentUserId={userId}
            deleteNote={deleteNote}
            isDeleted
          />
          )}
      </>
    ));
  }

  return (
    <div>
      <Dialog className={classes.dialogWindow} maxWidth="lg" open={showModal} onClose={toggleModal}>
        <DialogTitle className={classes.textCenter}>
          <Typography variant="h4">Add Note</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={toggleModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.pdContent}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, actions) => {
              Promise.resolve(dispatch(addClientNote(values))).then(() => {
                dispatch(fetchClient(values.clientId, client.app_id));
              }).then(() => {
                actions.setFieldValue('clientNoteText', '');
                toggleModal();
              });
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <div className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosizeWrap}`}>
                  <label
                    className={`${classes.textAreaAutosizeLabel}  ${Boolean(formikProps.errors.clientNoteText) && classes.hasError} fd-booking-MuiFormLabel-root fd-booking-MuiInputLabel-root fd-booking-MuiInputLabel-formControl fd-booking-MuiInputLabel-animated fd-booking-MuiInputLabel-shrink fd-booking-MuiInputLabel-outlined fd-booking-MuiFormLabel-filled`}
                    data-shrink="true"
                    htmlFor="clientNoteText"
                  >
                    Client Notes
                  </label>
                  <TextareaAutosize
                    className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosize} ${Boolean(formikProps.errors.clientNoteText) && classes.hasError}`}
                    name="clientNoteText"
                    id="clientNoteText"
                    aria-label="Client Notes"
                    rowsMin={2}
                    value={formikProps.values.clientNoteText}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                  />
                  <p className={`${classes.errorText} ${Boolean(formikProps.errors.clientNoteText) && classes.hasError}`}>{formikProps.errors.clientNoteText}</p>
                </div>
                <Grid justify="flex-end" container spacing={1}>
                  <Grid item>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="clientNoteType"
                        value={formikProps.values.clientNoteType}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio size="small" className={classes.pd0} />}
                          label="Warning"
                          className="noteRadio"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio size="small" className={classes.pd0} />}
                          label="Note"
                          className="noteRadio"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio size="small" className={classes.pd0} />}
                          label="Preference"
                          className="noteRadio"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <BlueButton variant="contained" type="submit" size="small">
                      Add
                    </BlueButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {notesList}

      <Grid justify="flex-end" container spacing={1}>
        <Grid item>
          {deletedList && (
          <WhiteButton
            variant="contained"
            size="small"
            endIcon={showDeletedNotes ? <ArrowDropUp /> : <ArrowDropDown />}
            onClick={() => setShowDeletedNotes(!showDeletedNotes)}
          >
            Deleted
          </WhiteButton>
          )}
        </Grid>

        <Grid item>
          <GreenButton variant="contained" size="small" endIcon={<Add />} onClick={toggleModal}>
            Add client note
          </GreenButton>
        </Grid>
      </Grid>

      {deletedList && (
      <Collapse in={showDeletedNotes}>
        {deletedList}
      </Collapse>
      )}
    </div>
  );
};

export default ClientNotes;
