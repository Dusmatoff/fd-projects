import React from 'react';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../../../styles';

const ClientRatings = ({ client }) => {
  const classes = useStyles();

  return (
    <>
      <span className={classes.fontSize15}>
        Punctuality
        {' '}
        {client.done_ratings.param1}
      </span>
      <br />
      <Rating value={client.done_ratings.param1} className={classes.ratingIcon} precision={0.1} readOnly />
      <br />

      <span className={classes.fontSize15}>
        Respectfulness
        {' '}
        {client.done_ratings.param2}
      </span>
      <br />
      <Rating value={client.done_ratings.param2} className={classes.ratingIcon} precision={0.1} readOnly />
      <br />

      <span className={classes.fontSize15}>
        Cleanliness
        {' '}
        {client.done_ratings.param3}
      </span>
      <br />
      <Rating value={client.done_ratings.param3} className={classes.ratingIcon} precision={0.1} readOnly />
      <br />

      <span>
        {client.done_ratings.count}
        {' '}
        rate votes
      </span>
    </>
  );
};

export default ClientRatings;
