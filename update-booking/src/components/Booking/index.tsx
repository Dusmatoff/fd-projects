import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import HeaderButtons from './HeaderButtons';
import Contacts from './Contacts';
import DateTimes from './DateTimes';
import CrewSize from './CrewSize';
import StudioNote from './StudioNote';
import PaymentsAndOrders from './PaymentsAndOrders';
import Additional from './Additional';
import AdminNotes from './AdminNotes';
import FooterButtons from './FooterButtons';
import {
  getBooking,
  getBookingOption,
  getClientDeposit100,
  getClient,
  getUser,
} from '../../selectors';
import {
  addLog,
  bookingCheckOverlap,
  createNewClient,
  deleteBooking,
  fetchBooking,
  saveBooking,
  setStatusApproved,
  setStatusCancelled,
  setStatusCheckedIn,
  setStatusDone,
  setStatusNoAnswer,
} from '../../actions/booking';
import { fetchBookingOption } from '../../actions/bookingOption';
import { fetchTransactions } from '../../actions/transactions';
import { isEndSmallerStartTime, openInNewTab, errorMessages } from '../../utils';
import useStyles from '../styles';

const Booking = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const booking = useSelector((state) => getBooking(state));
  const bookingOption = useSelector((state) => getBookingOption(state));
  const deposit100 = useSelector((state) => getClientDeposit100(state));
  const client = useSelector((state) => getClient(state));
  const user = useSelector((state) => getUser(state));

  /* FORMIK */
  Yup.addMethod(Yup.string, 'phoneValidation', function (phone) {
    return this.test('test-phone', phone, (value) => {
      const phoneFormatted = value.match(/\d/g).join('');

      return phoneFormatted.length === 10;
    });
  });

  const validationSchema = Yup.object({
    name: Yup.string().trim().matches(/[a-z A-Z]/i, errorMessages.name).min(3)
      .max(100)
      .required(),
    email: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, errorMessages.email).max(320).required(),
    phone: Yup.string().phoneValidation(errorMessages.phone).required(),
    date: Yup.date().required(),
    startTime: Yup.string().required(),
    endTime: Yup.string().required(),
    rentType: Yup.string().required(),
    additionalComments: Yup.string().max(1000),
    numberOfPeopleInCrew: Yup.number().min(0, 'Minimum 0').max(99, 'Maximum 99').integer('Please provide valid people'),
    aComment: Yup.string().max(1000, 'Maximum 1000 symbols'),
    additionalCstands: Yup.number().min(0, 'Minimum 0').max(99, 'Maximum 99').integer('Must be an integer'),
    additionalStrobes: Yup.number().min(0, 'Minimum 0').max(99, 'Maximum 99').integer('Must be an integer'),
    checkInNotes: Yup.string().max(1000, 'Maximum 1000 symbols'),
    logNote: Yup.string().max(1000),
    fromLink: Yup.string().when('from', {
      is: (from) => from !== 'client' && from !== 'FD',
      then: Yup.string().required('Add link'),
    }),
  });

  const initialValues = {
    // wp_ap_appointments
    id: booking.id,
    name: booking.name,
    email: booking.email,
    hallId: booking.hall_id,
    phone: booking.phone,
    startTime: booking.start_time,
    endTime: booking.end_time,
    date: booking.date,
    canceledReason: booking.cncld_reason,
    appointmentKey: booking.appointment_key,
    status: booking.status,
    lastEditedBy: booking.last_edited_by, // appointment_by in db
    aComment: booking.a_comment,
    clientId: booking.client_id,
    specialRequest: Boolean(+booking.special_request),
    waitClient: Boolean(+booking.wait_client),

    // wp_ap_appointment_options
    freightElevator: Boolean(+bookingOption.freight_elevator),
    rentType: bookingOption.rent_type,
    blackout: Boolean(+bookingOption.blackout),
    cycwall: Boolean(+bookingOption.cycwall),
    numberOfPeopleInCrew: +bookingOption.number_of_people_in_crew,
    soundSensetive: Boolean(+bookingOption.sound_sensetive),
    preLightSetup: Boolean(+bookingOption.pre_light_setup),
    technicalAssistant: Boolean(+bookingOption.technical_assistant),
    retouchServices: Boolean(+bookingOption.retouch_services),
    videoBackstage: Boolean(+bookingOption.video_backstage),
    rainShower: Boolean(+bookingOption.rain_shower),
    additionalComments: bookingOption.additional_comments ? bookingOption.additional_comments : '',
    hardToClean: bookingOption.hard_to_clean,
    from: bookingOption.from,
    fromLink: bookingOption.from_link,
    cycWallRepaint: Boolean(+bookingOption.cyc_wall_repaint),

    // wp_ap_appointments_rating
    param1: booking.ratings ? +booking.ratings.param1 : 0,
    param2: booking.ratings ? +booking.ratings.param2 : 0,
    param3: booking.ratings ? +booking.ratings.param3 : 0,

    // wp_ap_appointments_changes
    logAction: '',
    logNote: '',

    // wp_ap_checkins
    trigger: booking.checkins ? Boolean(+booking.checkins.triger) : false,
    fogMachine: booking.checkins ? Boolean(+booking.checkins.fog_machine) : false,
    videoLights: booking.checkins ? Boolean(+booking.checkins.video_lights) : false,
    additionalCstands: booking.checkins ? +booking.checkins.additional_c_stands : '',
    additionalStrobes: booking.checkins ? +booking.checkins.additional_strobes : '',
    checkInNotes: booking.checkins ? booking.checkins.check_in_notes : '',

    // Other fields only for Formik
    dayOfWeek: booking.day_of_week,
    totalHours: booking.total_hours,
    submitButtonType: '', // For listening which button is clicked
    blacklist: Boolean(+client.blacklist),
  };
  /* FORMIK */

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        if (isEndSmallerStartTime(values.startTime, values.endTime)) {
          alert('Start time must be smaller then end time');
          return;
        }
        // For listening which button is clicked
        switch (values.submitButtonType) {
          case 'save_booking':
          default:
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(fetchBooking(values.id));
            }).then(() => {
              dispatch(fetchBookingOption(values.id));
              dispatch(fetchTransactions(values.id));
            });
            break;
          case 'copy_booking':
            openInNewTab(`/wp-admin/admin.php?page=copy-appointment&copyid=${values.id}`);
            break;
          case 'create_new_client':
            dispatch(createNewClient(values.id));
            break;
          case 'create_callsheet':
            break;
          case 'delete':
            if (window.confirm('Do you want to PERMANENTLY delete this appointment?')) {
              dispatch(deleteBooking(values.id));
            }
            break;
          case 'status_no_answer':
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(addLog(values));
            }).then(() => {
              dispatch(setStatusNoAnswer(values));
            }).then(() => {
              dispatch(fetchBooking(values.id));
            })
              .then(() => {
                dispatch(fetchBookingOption(values.id));
                dispatch(fetchTransactions(values.id));
              });
            break;
          case 'status_cancelled':
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(setStatusCancelled(values));
            }).then(() => {
              dispatch(fetchBooking(values.id));
            }).then(() => {
              dispatch(fetchBookingOption(values.id));
              dispatch(fetchTransactions(values.id));
            });
            break;
          case 'status_done':
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(setStatusDone(values));
            }).then(() => {
              dispatch(fetchBooking(values.id));
            }).then(() => {
              dispatch(fetchBookingOption(values.id));
              dispatch(fetchTransactions(values.id));
            });
            break;
          case 'status_approve':
            dispatch(bookingCheckOverlap(values));
            break;
          case 'continue_overlapping':
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(setStatusApproved(values));
            }).then(() => {
              dispatch(fetchBooking(values.id));
            }).then(() => {
              dispatch(fetchBookingOption(values.id));
            });
            break;
          case 'status_checked_in':
            Promise.resolve(dispatch(saveBooking(values))).then(() => {
              dispatch(setStatusCheckedIn(values));
            }).then(() => {
              dispatch(fetchBooking(values.id));
            }).then(() => {
              dispatch(fetchBookingOption(values.id));
              dispatch(fetchTransactions(values.id));
            });
            break;
        }

        actions.setFieldValue('submitButtonType', '');// Clear submit button type
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <HeaderButtons data={formikProps} />
          <div className={classes.bookingBlock}>
            <Contacts data={formikProps} client={client} user={user} />
            <Divider />
            <DateTimes data={formikProps} />
            <Divider />
            <CrewSize data={formikProps} />
            <StudioNote />
            <Divider />
            <AdminNotes data={formikProps} />
            <Divider />
            <PaymentsAndOrders />
            <Divider />
            <Additional data={formikProps} />
            <Divider />
            <FooterButtons data={formikProps} deposit100={deposit100} />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Booking;
