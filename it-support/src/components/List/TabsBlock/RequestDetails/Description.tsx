import React from 'react';
import Image from './Image';
import { SYMFONY_API_DOWNLOADS_URL } from '../../../../utils';
import useStyles from '../../../styles';

const Description = ({ description, files }) => {
  const classes = useStyles();
  const images = files.filter((file) => file.mime.includes('image'));
  const videos = files.filter((file) => file.mime.includes('video'));

  return (
    <div>
      <p className={`${classes.descriptionFont} ${classes.descriptionHeight} `}>{description}</p>
      <div>
        {images.map((img) => <Image src={`${SYMFONY_API_DOWNLOADS_URL}/support/image/${img.name}`} />)}
      </div>
      <div>
        {videos.map((video) => (
          <video width="400" controls>
            <source src={`${SYMFONY_API_DOWNLOADS_URL}/support/video/${video.name}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

export default Description;
