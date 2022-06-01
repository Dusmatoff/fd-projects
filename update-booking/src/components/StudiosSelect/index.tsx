import React from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import { getHalls, getStagePermalink } from '../../selectors';
import useStyles from '../styles';
import { anyAvailableIds } from '../../utils';

const StudiosSelect = (props) => {
  const classes = useStyles();

  const halls = useSelector((state) => getHalls(state));
  const stagePermalink = useSelector((state) => getStagePermalink(state));

  const {
    data, showLinkIcon, removeAny,
  } = props;

  const hallsLosAngeles = Object.keys(halls[1]).map((item) => {
    if (removeAny && anyAvailableIds.includes(Number(item))) {
      return null;
    }
    return <option key={item} value={item}>{halls[1][item]}</option>;
  });

  const hallsNewYork = Object.keys(halls[2]).map((item) => {
    if (removeAny && anyAvailableIds.includes(Number(item))) {
      return null;
    }
    return <option key={item} value={item}>{halls[2][item]}</option>;
  });

  const hallsChicago = Object.keys(halls[3]).map((item) => {
    if (removeAny && anyAvailableIds.includes(Number(item))) {
      return null;
    }
    return <option key={item} value={item}>{halls[3][item]}</option>;
  });

  let showLink = showLinkIcon;
  if (showLinkIcon) {
    if (anyAvailableIds.indexOf(parseInt(data.values.hallId, 10)) !== -1) {
      showLink = false;
    }
  }

  return (
    <>
      <div className={classes.Flex}>
        <FormControl variant="outlined" className={showLinkIcon ? classes.studioSelect : classes.width100}>
          <InputLabel htmlFor="hallid">Studio</InputLabel>
          <Select
            name="hallId"
            native
            value={data.values.hallId}
            onChange={data.handleChange}
            label="Studio"
            inputProps={{ name: 'hallId', id: 'hallId' }}
          >
            <optgroup label="LOS ANGELES">{hallsLosAngeles}</optgroup>
            <optgroup label="NEW YORK">{hallsNewYork}</optgroup>
            <optgroup label="CHICAGO">{hallsChicago}</optgroup>
          </Select>
        </FormControl>
        {showLink && (
        <IconButton size="small">
          <LinkIcon onClick={() => window.open(stagePermalink, '_blank')} />
        </IconButton>
        )}
      </div>
    </>
  );
};

export default StudiosSelect;
