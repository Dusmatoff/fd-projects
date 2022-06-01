import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useStyles from '../../styles';

const Additional = ({ data }) => {
  const classes = useStyles();

  const {
    additionalComments,
    freightElevator,
    blackout,
    soundSensetive,
    cycwall,
    preLightSetup,
    technicalAssistant,
    retouchServices,
    videoBackstage,
    rainShower,
    cycWallRepaint,
  } = data.values;

  return (
    <>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12}>
          <div className={`${classes.width100} ${classes.mtMinus10} ${classes.textAreaAutosizeWrap}`}>
            <label
              className={`${classes.textAreaAutosizeLabel}  ${Boolean(data.errors.additionalComments) && classes.hasError} fd-booking-MuiFormLabel-root fd-booking-MuiInputLabel-root fd-booking-MuiInputLabel-formControl fd-booking-MuiInputLabel-animated fd-booking-MuiInputLabel-shrink fd-booking-MuiInputLabel-outlined fd-booking-MuiFormLabel-filled`}
              data-shrink="true"
              htmlFor="additionalComments"
            >
              Client request
            </label>
            <TextareaAutosize
              className={`${classes.width100} ${classes.mt10} ${classes.textAreaAutosize} ${classes.fontSize085rem}  ${Boolean(data.errors.additionalComments) && classes.hasError}`}
              name="additionalComments"
              id="additionalComments"
              aria-label="Client request"
              rowsMin={2}
              value={additionalComments}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
            />
            <p className={`${classes.errorText} ${Boolean(data.errors.additionalComments) && classes.hasError}`}>
              {data.errors.additionalComments}
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid container justify="space-between" className={`${classes.pd10} ${classes.mbMinus20}`}>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={freightElevator}
                onChange={data.handleChange}
                name="freightElevator"
                size="small"
                color="primary"
              />
                        )}
            label="Freight Elevator"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={blackout}
                onChange={data.handleChange}
                name="blackout"
                size="small"
                color="primary"
              />
                        )}
            label="Blackout"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={soundSensetive}
                onChange={data.handleChange}
                name="soundSensetive"
                size="small"
                color="primary"
              />
                        )}
            label="Sound sensetive"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={cycWallRepaint}
                onChange={data.handleChange}
                name="cycWallRepaint"
                size="small"
                color="primary"
              />
                        )}
            label="Cyc Repaint"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={preLightSetup}
                onChange={data.handleChange}
                name="preLightSetup"
                size="small"
                color="primary"
              />
                        )}
            label="Pre-light setup"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={technicalAssistant}
                onChange={data.handleChange}
                name="technicalAssistant"
                size="small"
                color="primary"
              />
                        )}
            label="Technical assistant"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={retouchServices}
                onChange={data.handleChange}
                name="retouchServices"
                size="small"
                color="primary"
              />
                        )}
            label="Retouch services"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={cycwall}
                onChange={data.handleChange}
                name="cycwall"
                size="small"
                color="primary"
              />
                        )}
            label="Use CYC Wall"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={videoBackstage}
                onChange={data.handleChange}
                name="videoBackstage"
                size="small"
                color="primary"
              />
                        )}
            label="Video backstage"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
        <Grid item xs={6} xl={4}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={rainShower}
                onChange={data.handleChange}
                name="rainShower"
                size="small"
                color="primary"
              />
                        )}
            label="Using Rain/Shower"
            className="whiteCheckbox serviceCheckbox"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Additional;
