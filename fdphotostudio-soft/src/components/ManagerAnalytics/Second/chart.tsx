import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getManagerAnalytics } from '../../../store/selectors';
import { roundToDec, calcRentWorkedHours } from '../../../utils';
import useStyles from '../../styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LocManagerChart = () => {
  const classes = useStyles();

  const data = useSelector((state) => getManagerAnalytics(state));

  const {
    locations,
    hallsColors,
    monthYearsLocManager: labels,
    sumHoursEachLocationsDone: sumHours,
    ordinaryHoursByLocations: ordinaryHours,
    overtimeHoursByLocations: overtimeHours,
  } = data;

  const bookingDoneHoursData = {
    labels,
    datasets: [],
  };

  const ordinaryHoursData = {
    labels,
    datasets: [],
  };

  const overtimeHoursData = {
    labels,
    datasets: [],
  };

  const rentedHoursData = {
    labels,
    datasets: [],
  };

  for (const locationId in locations) {
    const bookingObj = {
      label: locations[locationId],
      borderColor: hallsColors[locationId],
      backgroundColor: hallsColors[locationId],
      data: [],
    };

    const ordinaryObj = {
      label: locations[locationId],
      borderColor: hallsColors[locationId],
      backgroundColor: hallsColors[locationId],
      data: [],
    };

    const overtimeObj = {
      label: locations[locationId],
      borderColor: hallsColors[locationId],
      backgroundColor: hallsColors[locationId],
      data: [],
    };

    const rentedObj = {
      label: locations[locationId],
      borderColor: hallsColors[locationId],
      backgroundColor: hallsColors[locationId],
      data: [],
    };

    labels.forEach((month) => {
      const result1 = sumHours?.[month]?.[locationId] ? roundToDec(sumHours[month][locationId] * 60) : 0;
      bookingObj.data.push(result1);

      const result2 = ordinaryHours?.[month]?.[locationId] ? roundToDec(ordinaryHours[month][locationId]) : 0;
      ordinaryObj.data.push(result2);

      const result3 = overtimeHours?.[month]?.[locationId] ? roundToDec(overtimeHours[month][locationId]) : 0;
      overtimeObj.data.push(result3);

      rentedObj.data.push(calcRentWorkedHours(sumHours, ordinaryHours, overtimeHours, month, locationId));
    });

    bookingDoneHoursData.datasets.push(bookingObj);
    ordinaryHoursData.datasets.push(ordinaryObj);
    overtimeHoursData.datasets.push(overtimeObj);
    rentedHoursData.datasets.push(rentedObj);
  }

  return (
    <Grid container justify="space-between" className={classes.mt20}>
      <Grid item xs={12} sm={6}>
        <Typography align="center" variant="h5">
          BOOKING DONE HOURS
        </Typography>
        <Line data={bookingDoneHoursData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="center" variant="h5">
          ORDINARY HOURS
        </Typography>
        <Line data={ordinaryHoursData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="center" variant="h5">
          OVERTIME HOURS
        </Typography>
        <Line data={overtimeHoursData} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="center" variant="h5">
          RENTED/WORKED HOURS
        </Typography>
        <Line data={rentedHoursData} />
      </Grid>
    </Grid>
  );
};

export default LocManagerChart;
