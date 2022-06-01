import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getLocations, getCurrentLocation } from '../../store/selectors';
import { setCurrentLocation } from '../../store/actions/app';

const Locations = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => getLocations(state));
  const currentLocation = useSelector((state) => getCurrentLocation(state));

  const handleChangeLocation = (event) => {
    dispatch(setCurrentLocation(+event.target.value));
  };

  useEffect(() => {
    dispatch(setCurrentLocation(locations[0].id));
  }, []);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose Location</FormLabel>
      <RadioGroup name="location" value={currentLocation} onChange={handleChangeLocation} row>
        {
          locations.map(({ id, name }) => <FormControlLabel value={id} control={<Radio />} label={name === 'LA Lofts' ? 'Distribution(LA Lofts)' : name} />)
        }
      </RadioGroup>
    </FormControl>
  );
};

export default Locations;
