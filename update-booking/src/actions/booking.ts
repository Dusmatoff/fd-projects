import moment from 'moment';
import * as bookingTypes from '../actionTypes/booking';
import * as types from '../actionTypes/app';
import {
  ajaxGet, ajaxPost, updateBooking, openAppPage,
} from '../utils';

export const setBookingId = (bookingId) => ({ type: types.SET_BOOKING_ID, payload: { bookingId } });

export const fetchBooking = (bookingId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const booking = await updateBooking(bookingId);

    dispatch({ type: bookingTypes.SET_BOOKING, payload: booking });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const saveBooking = (values) => {
  const startDate = moment(values.date).format('YYYY-MM-DD');
  const phoneFormatted = values.phone.match(/\d/g).join('');

  const formData = new FormData();

  formData.set('action', 'booking_save');
  // wp_ap_appointments
  formData.set('id', values.id);
  formData.set('name', values.name);
  formData.set('email', values.email);
  formData.set('hall_id', values.hallId);
  formData.set('phone', phoneFormatted);
  formData.set('start_time', values.startTime);
  formData.set('end_time', values.endTime);
  formData.set('date', startDate);
  formData.set('cncld_reason', values.canceledReason);
  formData.set('status', values.status);
  formData.set('a_comment', values.aComment);
  formData.set('last_edited_by', values.lastEditedBy);
  formData.set('client_id', values.clientId);
  formData.set('special_request', values.specialRequest);
  formData.set('wait_client', values.waitClient);

  // wp_ap_appointment_options
  formData.set('freight_elevator', values.freightElevator);
  formData.set('rent_type', values.rentType);
  formData.set('blackout', values.blackout);
  formData.set('cycwall', values.cycwall);
  formData.set('number_of_people_in_crew', values.numberOfPeopleInCrew);
  formData.set('sound_sensetive', values.soundSensetive);
  formData.set('pre_light_setup', values.preLightSetup);
  formData.set('technical_assistant', values.technicalAssistant);
  formData.set('retouch_services', values.retouchServices);
  formData.set('video_backstage', values.videoBackstage);
  formData.set('rain_shower', values.rainShower);
  formData.set('additional_comments', values.additionalComments);
  formData.set('hard_to_clean', values.hardToClean);
  formData.set('from', values.from);
  formData.set('from_link', values.fromLink);
  formData.set('cyc_wall_repaint', values.cycWallRepaint);

  // wp_ap_checkins
  if (values.status === 'done' || values.status === 'checked in') {
    formData.set('trigger', values.trigger);
    formData.set('fog_machine', values.fogMachine);
    formData.set('video_lights', values.videoLights);
    formData.set('additional_c_stands', values.additionalCstands);
    formData.set('additional_strobes', values.additionalStrobes);
    formData.set('check_in_notes', values.checkInNotes);
  }

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });

    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const copyBooking = (bookingId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const copiedId = await ajaxGet('copy_booking', { id: bookingId });

    dispatch({
      type: types.SHOW_ALERT,
      payload: 'Booking copied! Now you\'ll be redirect to new page.',
    });

    window.open(`/wp-admin/admin.php?page=update-appointment&updateid=${copiedId}`, '_blank');
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const createNewClient = (bookingId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('create_new_client', { id: bookingId });

    dispatch({
      type: types.SHOW_CREATE_CLIENT_MODAL,
      payload: result,
    });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const createClientFromBooking = (bookingId) => async function (dispatch) {
  dispatch({ type: types.HIDE_CREATE_CLIENT_MODAL });
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('create_client_from_booking', { id: bookingId });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const attachClientId = (bookingId, clientId) => async function (dispatch) {
  dispatch({ type: types.HIDE_CREATE_CLIENT_MODAL });
  dispatch({ type: types.SHOW_LOADER });

  try {
    const result = await ajaxGet('attach_client_id', { id: bookingId, attach_client_id: clientId });

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const deleteBooking = (bookingId) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  try {
    ajaxGet('delete_booking', { id: bookingId });

    dispatch({
      type: types.SHOW_ALERT,
      payload: 'Booking deleted! Now you\'ll be redirect to calendar page.',
    });

    openAppPage();
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const addLog = (values) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();
  formData.set('action', 'booking_log_action');
  formData.set('log_action', values.logAction);
  formData.set('log_note', values.logNote);
  formData.set('id', values.id);

  try {
    const result = await ajaxPost(formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const setStatusNoAnswer = (values) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  formData.set('action', 'booking_status_no_answer');
  formData.set('id', values.id);

  try {
    const result = await ajaxPost(formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });

    openAppPage();
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const setStatusCancelled = (values) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  formData.set('action', 'booking_status_cancelled');
  formData.set('id', values.id);
  formData.set('cncld_reason', values.canceledReason);

  try {
    const result = await ajaxPost(formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });

    openAppPage();
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const setStatusDone = (values) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  formData.set('action', 'booking_status_done');
  formData.set('id', values.id);
  formData.set('client_id', values.clientId);
  formData.set('param1', values.param1);
  formData.set('param2', values.param2);
  formData.set('param3', values.param3);
  formData.set('status', values.status);

  try {
    const result = await ajaxPost(formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });

    openAppPage();
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const bookingCheckOverlap = (values) => {
  const startDate = moment(values.date).format('YYYY-MM-DD');
  const startTime = moment(values.startTime).format('hh:mm A');
  const endTime = moment(values.endTime).format('hh:mm A');

  const formData = new FormData();

  formData.set('id', values.id);
  formData.set('action', 'booking_check_overlap');
  formData.set('hall_id', values.hallId);
  formData.set('start_date', startDate);
  formData.set('start_time', startTime);
  formData.set('end_time', endTime);

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });
    try {
      const check = await ajaxPost(formData);

      if (parseInt(check, 10) === 1) {
        dispatch({ type: types.SHOW_ALERT, payload: 'available' });

        Promise.resolve(dispatch(saveBooking(values)))
          .then(
            () => dispatch(setStatusApproved(values)),
          )
          .then(
            () => window.open('/wp-admin/admin.php?page=appointment-calendar', '_self'),
          );
      } else {
        dispatch({
          type: bookingTypes.SHOW_CONTINUE_OVERLAPPING,
          payload: check,
        });
      }
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const setStatusApproved = (values) => {
  const formData = new FormData();

  formData.set('id', values.id);
  formData.set('action', 'booking_status_approved');

  return async function (dispatch) {
    dispatch({ type: types.SHOW_LOADER });
    try {
      const result = await ajaxPost(formData);

      dispatch({ type: types.SHOW_ALERT, payload: result.message });

      openAppPage();
    } catch (error) {
      dispatch({ type: types.SHOW_ERROR, payload: error.message });
      throw error.message;
    } finally {
      dispatch({ type: types.HIDE_LOADER });
    }
  };
};

export const setStatusCheckedIn = (values) => async function (dispatch) {
  dispatch({ type: types.SHOW_LOADER });

  const formData = new FormData();

  formData.set('action', 'booking_status_checked_in');
  formData.set('id', values.id);
  formData.set('trigger', values.trigger);
  formData.set('fog_machine', values.fogMachine);
  formData.set('video_lights', values.videoLights);
  formData.set('additional_c_stands', values.additionalCstands);
  formData.set('additional_strobes', values.additionalStrobes);
  formData.set('check_in_notes', values.checkInNotes);

  try {
    const result = await ajaxPost(formData);

    dispatch({ type: types.SHOW_ALERT, payload: result.message });
  } catch (error) {
    dispatch({ type: types.SHOW_ERROR, payload: error.message });
    throw error.message;
  } finally {
    dispatch({ type: types.HIDE_LOADER });
  }
};

export const showContinueOverlapping = (message): Object => ({ type: bookingTypes.SHOW_CONTINUE_OVERLAPPING, payload: message });

export const hideContinueOverlapping = (): Object => ({ type: bookingTypes.HIDE_CONTINUE_OVERLAPPING });
