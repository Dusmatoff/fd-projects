import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from './Image';
import { fetchRequestComments } from '../../../../store/actions/requests';
import { getComments, getUserId } from '../../../../store/selectors';
import useStyles from '../../../styles';
import { SYMFONY_API_DOWNLOADS_URL } from '../../../../utils';

const Comments = ({ requestId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const comments = useSelector((state) => getComments(state));
  const userId = useSelector((state) => getUserId(state));

  useEffect(() => {
    //dispatch(fetchRequestComments(requestId));
  }, []);

  if (!(requestId in comments)) {
    return <p>No comments yet...</p>;
  }

  return (
    <div>
      {comments[requestId].map(({
        comment, dateCreated, userId: commentUserId, files, displayName,
      }) => (
        <div className={classes.commentBlock} style={{  border: '2px solid',  borderColor: commentUserId === Number(userId) ? '#4aa0d7' : '#000' }}>
          <p className={classes.commentText}>
            {comment}
          </p>
          {files.map((file) => (
            file.mime.includes('image') ? <Image src={`${SYMFONY_API_DOWNLOADS_URL}/support/image/${file.name}`}/>
              : (
                <div>
                  <video width="400" controls>
                    <source src={`${SYMFONY_API_DOWNLOADS_URL}/support/video/${file.name}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
          ))}
          <p className={classes.commentTime}>{`${dateCreated} ${displayName}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
