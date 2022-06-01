import React from 'react';
import Description from './Description';
import AddComment from './AddComment';
import Comments from './Comments';
import useStyles from '../../../styles';
import {float} from "html2canvas/dist/types/css/property-descriptors/float";

const RequestDetails = ({ request }) => {
  const classes = useStyles();
  const {
    id, title, description, dateCreated, files, displayName,
  } = request;

  return (
    <div className={`${classes.pl15} ${classes.pr15}`}>
      <h3 className={classes.mrtitle}>{title}</h3>
      <div className={classes.founderTime}>{`${displayName} on ${dateCreated}`}</div>
      <Description description={description} files={files} />
      <Comments requestId={id} />
      <AddComment requestId={id} />
    </div>
  );
};

export default RequestDetails;
