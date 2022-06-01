import React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Clear from '@material-ui/icons/Clear';
import useStyles from '../../../styles';

const NoteItem = (props) => {
  const classes = useStyles();

  const {
    note, currentUserCanDelete, currentUserId, deleteNote, isDeleted,
  } = props;

  let className;
  switch (note.type) {
    case '2':
      className = classes.prefNote;
      break;
    case '3':
      className = classes.warningNote;
      break;
  }

  return (
    <div className={`${classes.noteBlock} ${classes.borderOneGray} ${className}`} key={note.timestamp}>
      <Typography variant="body1" className={`${classes.noteContent} ${classes.lineBreakAnywhere}`}>
        {note.note}
      </Typography>
      <Typography align="right" variant="caption" display="block">
        {moment.unix(+note.timestamp).format('M.DD.YY')}
        {' '}
        by
        {note.by_name}
        {(currentUserCanDelete || currentUserId === note.id) && !isDeleted
                && (
                <IconButton size="small" className={classes.noteRemove} onClick={() => deleteNote(note.id)}>
                  <Clear fontSize="small" className={classes.noteClear} />
                </IconButton>
                )}
      </Typography>
    </div>
  );
};

export default NoteItem;
