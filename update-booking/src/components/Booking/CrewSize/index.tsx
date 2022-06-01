import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useStyles from '../../styles';

const CrewSize = ({ data }) => {
  const classes = useStyles();

  const {
    numberOfPeopleInCrew,
    hardToClean,
    specialRequest,
  } = data.values;

  return (
    <Grid container spacing={1} justify="space-between">
      <Grid item xs={3}>
        <TextField
          name="numberOfPeopleInCrew"
          type="number"
          label="Crew size"
          variant="outlined"
          className={`${classes.numberField} ${classes.width100} ${classes.crewSize} ${classes.noWrap}`}
          InputLabelProps={{ shrink: true }}
          value={numberOfPeopleInCrew || ''}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          error={data.touched.numberOfPeopleInCrew && Boolean(data.errors.numberOfPeopleInCrew)}
          helperText={data.touched.numberOfPeopleInCrew && data.errors.numberOfPeopleInCrew}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl
          variant="outlined"
          className={`${hardToClean === 'yes' && classes.pinkSelect} ${classes.ml5}`}
        >
          <InputLabel htmlFor="hardToClean" className={classes.noWrap}>Hard to clean</InputLabel>
          <Select
            name="hardToClean"
            value={hardToClean}
            native
            onChange={data.handleChange}
            label="Hard to clean"
            inputProps={{
              name: 'hardToClean',
              id: 'hardToClean',
            }}
          >
            <option value="didn`t ask">Didn`t Ask</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControlLabel
          control={(
            <Checkbox
              name="specialRequest"
              checked={specialRequest}
              onChange={data.handleChange}
              size="small"
              color="primary"
            />
                    )}
          label="Special request"
          className={`whiteCheckbox ${classes.boldLabel} ${classes.mr0}`}
        />
      </Grid>
    </Grid>
  );
};

export default CrewSize;
