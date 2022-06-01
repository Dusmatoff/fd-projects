import React from 'react';
import { useSelector } from 'react-redux';
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

const ManagerChart = () => {
  const classes = useStyles();

  const data = useSelector((state) => getManagerAnalytics(state));

  const {
    locations,
    hallsColors,
    monthYearsManager,
    sumHoursEachLocationsDone: sumHours,
    ordinaryHoursByLocations: ordinaryHours,
    overtimeHoursByLocations: overtimeHours,
    totalSalaryByLocations: totalSalary,
  } = data;

  const labels = monthYearsManager.reverse();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

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

  const totalSalaryData = {
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

    const salaryObj = {
      label: locations[locationId],
      borderColor: hallsColors[locationId],
      backgroundColor: hallsColors[locationId],
      data: [],
    };

    labels.forEach((month) => {
      if ((month in sumHours) && locationId in sumHours[month]) {
        bookingObj.data.push(roundToDec(sumHours[month][locationId] * 60));
      } else {
        bookingObj.data.push(0);
      }

      if ((month in ordinaryHours) && locationId in ordinaryHours[month]) {
        ordinaryObj.data.push(roundToDec(ordinaryHours[month][locationId]));
      } else {
        ordinaryObj.data.push(0);
      }

      if ((month in overtimeHours) && locationId in overtimeHours[month]) {
        overtimeObj.data.push(roundToDec(overtimeHours[month][locationId]));
      } else {
        overtimeObj.data.push(0);
      }

      rentedObj.data.push(calcRentWorkedHours(sumHours, ordinaryHours, overtimeHours, month, locationId));

      if ((month in totalSalary) && locationId in totalSalary[month]) {
        salaryObj.data.push(roundToDec(totalSalary[month][locationId]));
      } else {
        salaryObj.data.push(0);
      }
    });

    bookingDoneHoursData.datasets.push(bookingObj);
    ordinaryHoursData.datasets.push(ordinaryObj);
    overtimeHoursData.datasets.push(overtimeObj);
    rentedHoursData.datasets.push(rentedObj);
    totalSalaryData.datasets.push(salaryObj);
  }

  return (
    <div className={classes.mt20}>
      <div className={classes.chart600}>
        <Typography align="center" variant="h5">
          BOOKING DONE HOURS
        </Typography>
        <Line options={chartOptions} data={bookingDoneHoursData} />
      </div>

      <div className={classes.chart600}>
        <Typography align="center" variant="h5">
          ORDINARY HOURS
        </Typography>
        <Line options={chartOptions} data={ordinaryHoursData} />
      </div>

      <div className={classes.chart600}>
        <Typography align="center" variant="h5">
          OVERTIME HOURS
        </Typography>
        <Line options={chartOptions} data={overtimeHoursData} />
      </div>

      <div className={classes.chart600}>
        <Typography align="center" variant="h5">
          RENTED/WORKED HOURS
        </Typography>
        <Line options={chartOptions} data={rentedHoursData} />
      </div>

      <div className={classes.chart600}>
        <Typography align="center" variant="h5">
          TOTAL SALARY
        </Typography>
        <Line options={chartOptions} data={totalSalaryData} />
      </div>
    </div>
  );
};

export default ManagerChart;
